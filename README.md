# Temporal LLM Orchestrator

A Node.js application that orchestrates LLM operations using Temporal workflow engine, featuring integration with Google's Gemini AI through LangChain.

## 🚀 Features

- Temporal workflow orchestration
- Google Gemini AI integration via LangChain
- REST API endpoints for LLM operations
- Docker containerization
- TypeScript support
- Redis caching
- Robust error handling and logging

## 📋 Prerequisites

- Node.js 18+
- Docker and Docker Compose
- Google API Key for Gemini AI
- Git

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd temporal-llm-orchestrator


Create .env file:

cp .env.example .env
# Edit .env and add your GOOGLE_API_KEY


Build and run with Docker:

docker-compose up --build

🏗️ Project Structure
├── src/
│   ├── activities/      # Temporal activities
│   ├── workflows/       # Temporal workflows
│   ├── api/            # Express API routes
│   ├── config/         # Configuration files
│   └── shared/         # Shared utilities and constants
├── temporal-config/    # Temporal server configuration
├── docker/            # Docker configuration files
└── tests/            # Test files

🔌 API Endpoints
Health Check
GET /health

Generate Text
POST /generate
Content-Type: application/json

{
    "prompt": "Your prompt here",
    "temperature": 0.7,
    "maxTokens": 1024
}

Check Workflow Status
GET /workflow/status/:workflowId

🐳 Docker Commands
# Build and start services
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f app

🔧 Configuration
Key configuration files:

.env: Environment variables
docker-compose.yml: Docker services configuration
temporal-config/config_template.yaml: Temporal server configuration

📝 Environment Variables

GOOGLE_API_KEY: Google API key for Gemini
NODE_ENV: Development/production environment
PORT: API server port
TEMPORAL_ADDRESS: Temporal server address
REDIS_URL: Redis connection URL

🧪 Testing
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

🔍 Monitoring

Access Temporal Web UI: http://localhost:8080
Monitor logs: docker-compose logs -f app
Redis Commander: http://localhost:8081

🛟 Troubleshooting
Common issues and solutions:


API Key Error

Verify .env file exists and contains valid GOOGLE_API_KEY
Check environment variable loading in containers



Docker Build Issues

Clean Docker cache: docker system prune -f
Verify Docker platform compatibility



Temporal Connection Issues

Ensure Temporal server is healthy
Check network connectivity between services



📚 Additional Resources

Temporal Documentation
LangChain Documentation
Google Gemini AI Documentation

🤝 Contributing

Fork the repository
Create your feature branch
Commit your changes
Push to the branch
Create a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

Would you like me to explain any specific section in more detail?
