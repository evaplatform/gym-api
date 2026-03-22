############################################################################### Main
help:	      # This help
	@cls
	@echo ""
	@echo "___________.__  __                                 _____ __________.___ "
	@echo "\_   _____/|__|/  |_  ____   ____   ______ ______ /  _  \\______   \   |"
	@echo " |    __)  |  \   __\/    \_/ __ \ /  ___//  ___//  /_\  \|     ___/   |"
	@echo " |     \   |  ||  | |   |  \  ___/ \___ \ \___ \/    |    \    |   |   |"
	@echo " \___  /   |__||__| |___|  /\___  >____  >____  >____|__  /____|   |___|"
	@echo "     \/                  \/     \/     \/     \/        \/              "
	@echo ""
	@type $(MAKEFILE_LIST) | findstr "^[a-zA-Z_\-]*: *.*"
############################################################################### Project support

dev:     # run api // http://localhost:3000/api-docs/S
	@npm run dev

commit:
	@set /p message="Enter commit message: " && \
    git add . && \
    git commit -m "%message%" && \
    git push origin main;

startDocker: 
	@docker-compose up -d  

killPort:
	@netstat -ano | findstr :3000 | findstr LISTENING && for /f "tokens=5" %a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do taskkill /PID %a /F

format: # format code
	@npm run format

reset: # reset packages
	@rmdir /S /Q node_modules
	@del /F /Q package-lock.json
	@npm i
    
build: # build project
	@npm run build

dev:     # run api // http://localhost:3000/api-docs/S
	@npm run dev

commit:
	@read -p "Enter commit message: " message; \
	git add .; \
	git commit -m "$$message"; \
	git push origin main;

startDocker: 
	@docker-compose up -d  

killPort:
	@netstat -ano | findstr :3000 | findstr LISTENING && for /f "tokens=5" %a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do taskkill /PID %a /F


format: # format code
	@npm run format

reset: # reset packages
	@rmdir /S /Q node_modules
	@del /F /Q package-lock.json
	@npm i
	
build: # build project
	@npm run build