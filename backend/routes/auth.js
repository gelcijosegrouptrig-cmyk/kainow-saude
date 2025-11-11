// =====================================================
// 🔐 ROTAS DE AUTENTICAÇÃO
// =====================================================

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { validarCPF } = require('../utils/validators');

// =====================================================
// POST /api/auth/register - Cadastrar novo usuário
// =====================================================

router.post('/register', async (req, res) => {
    try {
        const { cpf, nome, email, senha, telefone, dataNascimento, genero } = req.body;
        
        // Validar CPF
        const cpfLimpo = cpf.replace(/\D/g, '');
        if (!validarCPF(cpfLimpo)) {
            return res.status(400).json({
                success: false,
                message: 'CPF inválido'
            });
        }
        
        // Verificar se usuário já existe
        const usuarioExistente = await User.findOne({ 
            $or: [{ cpf: cpfLimpo }, { email }] 
        });
        
        if (usuarioExistente) {
            return res.status(409).json({
                success: false,
                message: usuarioExistente.cpf === cpfLimpo 
                    ? 'CPF já cadastrado' 
                    : 'Email já cadastrado'
            });
        }
        
        // Criar novo usuário
        const novoUsuario = new User({
            cpf: cpfLimpo,
            nome,
            email,
            senha,
            telefone,
            dataNascimento,
            genero: genero || 'outro'
        });
        
        await novoUsuario.save();
        
        // Gerar token
        const token = novoUsuario.gerarToken();
        
        res.status(201).json({
            success: true,
            message: 'Usuário cadastrado com sucesso!',
            data: {
                user: novoUsuario.toPublicJSON(),
                token
            }
        });
        
    } catch (error) {
        console.error('Erro no cadastro:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Erro ao cadastrar usuário'
        });
    }
});

// =====================================================
// POST /api/auth/login - Login de usuário
// =====================================================

router.post('/login', async (req, res) => {
    try {
        const { cpf, senha } = req.body;
        
        // Validações básicas
        if (!cpf || !senha) {
            return res.status(400).json({
                success: false,
                message: 'CPF e senha são obrigatórios'
            });
        }
        
        // Buscar usuário (incluindo senha)
        const cpfLimpo = cpf.replace(/\D/g, '');
        const usuario = await User.findOne({ cpf: cpfLimpo }).select('+senha');
        
        if (!usuario) {
            return res.status(401).json({
                success: false,
                message: 'CPF ou senha incorretos'
            });
        }
        
        // Verificar se conta está bloqueada
        if (usuario.bloqueadoAte && usuario.bloqueadoAte > new Date()) {
            return res.status(403).json({
                success: false,
                message: 'Conta temporariamente bloqueada. Tente novamente mais tarde.'
            });
        }
        
        // Verificar senha
        const senhaCorreta = await usuario.compararSenha(senha);
        
        if (!senhaCorreta) {
            // Incrementar tentativas de login
            usuario.tentativasLogin += 1;
            
            // Bloquear após 5 tentativas
            if (usuario.tentativasLogin >= 5) {
                usuario.bloqueadoAte = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos
                await usuario.save();
                
                return res.status(403).json({
                    success: false,
                    message: 'Muitas tentativas falhas. Conta bloqueada por 15 minutos.'
                });
            }
            
            await usuario.save();
            
            return res.status(401).json({
                success: false,
                message: 'CPF ou senha incorretos'
            });
        }
        
        // Login bem-sucedido
        usuario.tentativasLogin = 0;
        usuario.ultimoLogin = new Date();
        await usuario.save();
        
        // Gerar token
        const token = usuario.gerarToken();
        
        res.json({
            success: true,
            message: 'Login realizado com sucesso!',
            data: {
                user: usuario.toPublicJSON(),
                token
            }
        });
        
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao fazer login'
        });
    }
});

// =====================================================
// POST /api/auth/logout - Logout (limpa token no client)
// =====================================================

router.post('/logout', (req, res) => {
    // O logout é feito no frontend limpando o token
    // Esta rota é apenas para manter consistência da API
    res.json({
        success: true,
        message: 'Logout realizado com sucesso!'
    });
});

// =====================================================
// POST /api/auth/forgot-password - Recuperar senha
// =====================================================

router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        
        const usuario = await User.findOne({ email });
        
        if (!usuario) {
            // Por segurança, não informar se email existe ou não
            return res.json({
                success: true,
                message: 'Se o email estiver cadastrado, você receberá instruções para recuperar sua senha.'
            });
        }
        
        // Gerar token de reset (6 dígitos)
        const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
        
        usuario.tokenResetSenha = resetToken;
        usuario.tokenResetSenhaExpira = new Date(Date.now() + 30 * 60 * 1000); // 30 minutos
        await usuario.save();
        
        // TODO: Enviar email com token
        console.log(`📧 Token de reset para ${email}: ${resetToken}`);
        
        res.json({
            success: true,
            message: 'Se o email estiver cadastrado, você receberá instruções para recuperar sua senha.'
        });
        
    } catch (error) {
        console.error('Erro ao solicitar reset de senha:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao processar solicitação'
        });
    }
});

// =====================================================
// POST /api/auth/reset-password - Resetar senha
// =====================================================

router.post('/reset-password', async (req, res) => {
    try {
        const { email, token, novaSenha } = req.body;
        
        const usuario = await User.findOne({
            email,
            tokenResetSenha: token,
            tokenResetSenhaExpira: { $gt: Date.now() }
        }).select('+tokenResetSenha +tokenResetSenhaExpira');
        
        if (!usuario) {
            return res.status(400).json({
                success: false,
                message: 'Token inválido ou expirado'
            });
        }
        
        // Atualizar senha
        usuario.senha = novaSenha;
        usuario.tokenResetSenha = undefined;
        usuario.tokenResetSenhaExpira = undefined;
        await usuario.save();
        
        res.json({
            success: true,
            message: 'Senha alterada com sucesso!'
        });
        
    } catch (error) {
        console.error('Erro ao resetar senha:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao resetar senha'
        });
    }
});

module.exports = router;
