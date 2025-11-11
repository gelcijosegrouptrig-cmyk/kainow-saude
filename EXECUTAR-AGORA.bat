@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

REM 🚀 SCRIPT DE DEPLOY AUTOMÁTICO - HBVIDAESAUDE
REM Execute este arquivo para enviar tudo para GitHub e disparar deploy

echo.
echo 🚀 ==================================================
echo    DEPLOY AUTOMÁTICO - HB VIDA E SAÚDE
echo ==================================================
echo.

REM Verificar se está na pasta correta
if not exist "index.html" (
    echo ❌ ERRO: index.html não encontrado!
    echo    Você precisa executar este script na pasta do projeto.
    pause
    exit /b 1
)

echo ✅ Pasta do projeto detectada!
echo.

REM Verificar estrutura
echo 🔍 Verificando estrutura de arquivos...
echo.

if exist "css\style.css" (
    echo ✅ css\style.css encontrado
) else (
    echo ❌ css\style.css NÃO encontrado!
)

if exist "js\main.js" (
    echo ✅ js\main.js encontrado
) else (
    echo ❌ js\main.js NÃO encontrado!
)

if exist ".github\workflows\deploy.yml" (
    echo ✅ .github\workflows\deploy.yml encontrado
) else (
    echo ❌ .github\workflows\deploy.yml NÃO encontrado!
)

if exist "wrangler.toml" (
    echo ✅ wrangler.toml encontrado
) else (
    echo ❌ wrangler.toml NÃO encontrado!
)

echo.
echo ==================================================
echo.

REM Verificar se git está inicializado
if not exist ".git" (
    echo ⚠️  Repositório git não inicializado!
    echo.
    set /p resposta="Deseja inicializar? (s/n): "
    if /i "!resposta!"=="s" (
        git init
        git remote add origin https://github.com/gelcijosegrouptrig-cmyk/hbvidaesaude.git
        echo ✅ Repositório inicializado!
    ) else (
        echo ❌ Cancelado.
        pause
        exit /b 1
    )
)

echo.
echo 📋 Status atual do repositório:
echo ==================================================
git status
echo ==================================================
echo.

REM Confirmar com usuário
set /p confirma="🚀 Deseja enviar TUDO para GitHub? (s/n): "

if /i not "!confirma!"=="s" (
    echo.
    echo ❌ Operação cancelada pelo usuário.
    pause
    exit /b 0
)

echo.
echo 🔄 Adicionando todos os arquivos...
git add .

echo.
echo 💾 Criando commit...
git commit -m "Deploy: Estrutura completa do site HB Vida e Saúde - index.html com sistema de planos - CSS responsivo (css/style.css) - JavaScript com Mercado Pago (js/main.js) - Configuracao Cloudflare Pages (wrangler.toml) - GitHub Actions para deploy automatico - Integracao PIX (Woovi) e Cartao (Mercado Pago)"

echo.
echo 🚀 Enviando para GitHub (branch main)...

git push origin main 2>nul

if !errorlevel! equ 0 (
    echo.
    echo ✅ ==================================================
    echo    SUCESSO! Arquivos enviados para GitHub!
    echo ==================================================
    echo.
    echo ⏳ PRÓXIMOS PASSOS:
    echo.
    echo 1. O Cloudflare Pages vai detectar a mudança (30 segundos^)
    echo 2. Vai iniciar o build (2-3 minutos^)
    echo 3. Vai publicar no CDN global (3-5 minutos^)
    echo.
    echo 📍 Aguarde 10 minutos e acesse:
    echo    https://hbvidaesaude.me
    echo    https://hbvidaesaude.pages.dev
    echo.
    echo 🔍 Acompanhe o deploy em:
    echo    https://dash.cloudflare.com/
    echo    Workers ^& Pages → hbvidaesaude → Implantações
    echo.
    echo ✅ Deploy automático ATIVADO!
    echo    Agora toda vez que você fizer 'git push',
    echo    o site será atualizado automaticamente!
    echo.
) else (
    REM Tentar branch master se main falhar
    echo ⚠️  Branch 'main' falhou. Tentando 'master'...
    git push origin master 2>nul
    
    if !errorlevel! equ 0 (
        echo.
        echo ✅ ==================================================
        echo    SUCESSO! Arquivos enviados para GitHub!
        echo    (usando branch 'master'^)
        echo ==================================================
        echo.
        echo ⏳ Aguarde 10 minutos e acesse:
        echo    https://hbvidaesaude.me
        echo.
    ) else (
        echo.
        echo ❌ ==================================================
        echo    ERRO ao enviar para GitHub!
        echo ==================================================
        echo.
        echo Possíveis causas:
        echo 1. Você não está autenticado no git
        echo 2. A URL do repositório está incorreta
        echo 3. Você não tem permissão no repositório
        echo.
        echo 🔧 Soluções:
        echo.
        echo 1. Configure suas credenciais do git:
        echo    git config --global user.name "Seu Nome"
        echo    git config --global user.email "seu@email.com"
        echo.
        echo 2. Autentique com GitHub:
        echo    git remote set-url origin https://USERNAME@github.com/gelcijosegrouptrig-cmyk/hbvidaesaude.git
        echo    (substitua USERNAME pelo seu usuário do GitHub^)
        echo.
        echo 3. Ou faça upload manual pelo GitHub:
        echo    - Abra: https://github.com/gelcijosegrouptrig-cmyk/hbvidaesaude
        echo    - Clique 'Add file' → 'Upload files'
        echo    - Arraste toda a pasta do projeto
        echo    - Commit
        echo.
        pause
        exit /b 1
    )
)

echo ==================================================
echo.
pause
