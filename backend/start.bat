@echo off
chcp 65001 >nul
title RAZ 后台服务

echo.
echo  =========================================
echo   RAZ入门测试 · 后台服务
echo  =========================================
echo.

cd /d "%~dp0"

:: 检查 Python
python --version >nul 2>&1
if errorlevel 1 (
    echo  ❌ 未检测到 Python，请先安装：
    echo     https://www.python.org/downloads/
    echo     安装时勾选 "Add Python to PATH"
    echo.
    pause
    exit /b 1
)

:: 安装依赖（首次运行）
echo  📦 检查依赖包...
python -m pip install flask flask-cors -q

echo.
echo  ✅ 后台已启动！
echo.
echo     管理员登录地址: http://localhost:8000/admin/login
echo     默认密码: stacey2024
echo.
echo     （此窗口请保持开启，关闭后服务停止）
echo.

python app.py

pause
