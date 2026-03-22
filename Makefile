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

dev:     # run api // http://localhost:3000/api-docs/
	@npm run dev

commit:  # Commit changes
	@set /p message="Enter commit message: " && \
    git add . && \
    git commit -m "%message%" && \
    git push origin main

startDocker: # Start Docker containers
	@docker-compose up -d  

killPort: # Kill process using port 3000
	@netstat -ano | findstr :3000 | findstr LISTENING && for /f "tokens=5" %a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do taskkill /PID %a /F

format: # Format code
	@npm run format

reset: # Reset packages
	@rmdir /S /Q node_modules
	@del /F /Q package-lock.json
	@npm install
    
build: # Build project
	@npm run build