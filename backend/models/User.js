// =====================================================
// 👤 MODELO DE USUÁRIO
// =====================================================

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    // Dados pessoais
    cpf: {
        type: String,
        required: [true, 'CPF é obrigatório'],
        unique: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^\d{11}$/.test(v);
            },
            message: 'CPF inválido'
        }
    },
    nome: {
        type: String,
        required: [true, 'Nome é obrigatório'],
        trim: true,
        minlength: [3, 'Nome deve ter pelo menos 3 caracteres']
    },
    email: {
        type: String,
        required: [true, 'Email é obrigatório'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Email inválido']
    },
    telefone: {
        type: String,
        required: [true, 'Telefone é obrigatório'],
        trim: true
    },
    dataNascimento: {
        type: Date,
        required: [true, 'Data de nascimento é obrigatória']
    },
    genero: {
        type: String,
        enum: ['masculino', 'feminino', 'outro'],
        default: 'outro'
    },
    
    // Autenticação
    senha: {
        type: String,
        required: [true, 'Senha é obrigatória'],
        minlength: [6, 'Senha deve ter pelo menos 6 caracteres'],
        select: false // Não retornar senha nas queries por padrão
    },
    
    // Status da conta
    status: {
        type: String,
        enum: ['pending', 'active', 'blocked', 'suspended'],
        default: 'pending'
    },
    emailVerificado: {
        type: Boolean,
        default: false
    },
    tokenAtivacao: {
        type: String,
        select: false
    },
    tokenResetSenha: {
        type: String,
        select: false
    },
    tokenResetSenhaExpira: {
        type: Date,
        select: false
    },
    
    // Assinaturas e programas
    assinaturas: [{
        programId: String,
        programName: String,
        price: Number,
        startDate: Date,
        renewDate: Date,
        status: {
            type: String,
            enum: ['active', 'cancelled', 'expired'],
            default: 'active'
        }
    }],
    
    // Perfil médico
    alergias: [String],
    condicoesCronicas: [String],
    medicamentosEmUso: [String],
    planoSaude: {
        possui: {
            type: Boolean,
            default: false
        },
        operadora: String,
        numeroCarteirinha: String
    },
    
    // Segurança
    ultimoLogin: Date,
    tentativasLogin: {
        type: Number,
        default: 0
    },
    bloqueadoAte: Date,
    
    // Preferências
    preferencias: {
        notificacoesEmail: {
            type: Boolean,
            default: true
        },
        notificacoesSMS: {
            type: Boolean,
            default: false
        },
        notificacoesPush: {
            type: Boolean,
            default: true
        }
    }
}, {
    timestamps: true // Cria createdAt e updatedAt automaticamente
});

// =====================================================
// MIDDLEWARES PRÉ-SAVE
// =====================================================

// Hash da senha antes de salvar
userSchema.pre('save', async function(next) {
    if (!this.isModified('senha')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.senha = await bcrypt.hash(this.senha, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// =====================================================
// MÉTODOS DO SCHEMA
// =====================================================

// Comparar senha
userSchema.methods.compararSenha = async function(senhaCandidata) {
    return await bcrypt.compare(senhaCandidata, this.senha);
};

// Gerar token JWT
userSchema.methods.gerarToken = function() {
    const jwt = require('jsonwebtoken');
    return jwt.sign(
        { id: this._id, cpf: this.cpf },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
};

// Retornar dados públicos (sem senha)
userSchema.methods.toPublicJSON = function() {
    return {
        id: this._id,
        cpf: this.cpf,
        nome: this.nome,
        email: this.email,
        telefone: this.telefone,
        dataNascimento: this.dataNascimento,
        genero: this.genero,
        status: this.status,
        emailVerificado: this.emailVerificado,
        assinaturas: this.assinaturas,
        preferencias: this.preferencias,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

// =====================================================
// ÍNDICES
// =====================================================

userSchema.index({ cpf: 1 });
userSchema.index({ email: 1 });
userSchema.index({ status: 1 });

module.exports = mongoose.model('User', userSchema);
