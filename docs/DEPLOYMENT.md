# Deployment Guide

This guide provides step-by-step instructions for deploying the Lexicon Academy web application to production.

## 🚀 Deployment Options

### Frontend Deployment (Vercel Recommended)

#### Option 1: Vercel (Recommended)
1. **Prepare for Deployment**
   ```bash
   # Build the application locally first
   cd frontend
   npm run build
   ```

2. **Deploy to Vercel**
   - Install Vercel CLI: `npm i -g vercel`
   - Login to Vercel: `vercel login`
   - Deploy: `vercel --prod`
   - Follow the prompts to configure your project

3. **Environment Variables in Vercel**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
   ```

4. **Automatic Deployment**
   - Connect your GitHub repository to Vercel
   - Enable automatic deployments on push to main branch
   - Configure custom domain if needed

#### Option 2: Netlify
1. **Build Configuration**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `out` folder to Netlify
   - Or connect GitHub repository for automatic deployment

3. **Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
   ```

#### Option 3: AWS S3 + CloudFront
1. **Build and Upload**
   ```bash
   npm run build
   aws s3 sync out/ s3://your-bucket-name --delete
   ```

2. **Configure CloudFront**
   - Create CloudFront distribution
   - Set S3 bucket as origin
   - Configure custom domain and SSL

### Backend Deployment

#### Option 1: Render (Recommended)
1. **Prepare Repository**
   - Push your code to GitHub
   - Ensure `package.json` has correct start script

2. **Deploy to Render**
   - Sign up at render.com
   - Connect GitHub repository
   - Choose "Web Service"
   - Configure build settings:
     - Build Command: `npm install`
     - Start Command: `npm start`
   - Set environment variables

3. **Environment Variables**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lexicon-academy
   JWT_SECRET=your-production-jwt-secret
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-domain.com
   ```

#### Option 2: AWS EC2
1. **Server Setup**
   ```bash
   # Update server
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2
   sudo npm install -g pm2
   
   # Install Nginx
   sudo apt install nginx -y
   ```

2. **Deploy Application**
   ```bash
   # Clone repository
   git clone <your-repo-url>
   cd lexicon-academy/backend
   
   # Install dependencies
   npm install --production
   
   # Start with PM2
   pm2 start server.js --name lexicon-api
   pm2 startup
   pm2 save
   ```

3. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-api-domain.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **SSL Certificate**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-api-domain.com
   ```

#### Option 3: Heroku
1. **Prepare for Heroku**
   ```bash
   # Create Procfile
   echo "web: npm start" > Procfile
   
   # Create .gitignore
   echo "node_modules\n.env" > .gitignore
   ```

2. **Deploy**
   ```bash
   # Install Heroku CLI
   npm install -g heroku
   
   # Login and create app
   heroku login
   heroku create your-app-name
   
   # Set environment variables
   heroku config:set MONGODB_URI=your-mongodb-uri
   heroku config:set JWT_SECRET=your-jwt-secret
   heroku config:set NODE_ENV=production
   
   # Deploy
   git push heroku main
   ```

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)
1. **Create Cluster**
   - Sign up at mongodb.com/atlas
   - Create a free tier cluster
   - Choose cloud provider and region

2. **Configure Network**
   - Add IP address: `0.0.0.0/0` (for all access)
   - Create database user with strong password

3. **Get Connection String**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/lexicon-academy
   ```

4. **Environment Variables**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lexicon-academy
   ```

### Self-Hosted MongoDB
1. **Install MongoDB**
   ```bash
   # Ubuntu/Debian
   wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
   sudo apt-get update
   sudo apt-get install -y mongodb-org
   ```

2. **Configure MongoDB**
   ```bash
   # Start MongoDB
   sudo systemctl start mongod
   sudo systemctl enable mongod
   
   # Create database and user
   mongo
   use lexicon-academy
   db.createUser({
     user: "lexicon_user",
     pwd: "strong_password",
     roles: ["readWrite"]
   })
   ```

## 🔧 Environment Configuration

### Production Environment Variables
```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lexicon-academy

# JWT
JWT_SECRET=your-super-secure-production-jwt-secret-key
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=production

# Frontend URL
FRONTEND_URL=https://your-frontend-domain.com

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://your-api-domain.com/api/auth/google/callback

# File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🔒 Security Considerations

### SSL/HTTPS Configuration
1. **Frontend**
   - Vercel/Netlify: Automatic SSL
   - Custom domain: Configure SSL certificates

2. **Backend**
   - Use HTTPS only
   - Configure SSL certificates
   - Redirect HTTP to HTTPS

### Security Headers
```javascript
// Add to backend middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
```

### API Security
- Rate limiting implemented
- Input validation
- SQL injection prevention
- XSS protection
- CORS configuration

## 📊 Monitoring and Logging

### Application Monitoring
1. **Frontend**
   - Vercel Analytics
   - Google Analytics
   - Sentry for error tracking

2. **Backend**
   - PM2 monitoring
   - Winston for logging
   - Sentry for error tracking

### Log Management
```javascript
// Winston logger configuration
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});
```

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd frontend && npm ci
      - run: cd frontend && npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd backend && npm ci
      - name: Deploy to Render
        uses: johnbeynon/render-deploy-action@v0.0.8
        with:
          service-id: ${{ secrets.RENDER_SERVICE_ID }}
          api-key: ${{ secrets.RENDER_API_KEY }}
```

## 🚀 Performance Optimization

### Frontend Optimization
- Next.js automatic code splitting
- Image optimization
- Lazy loading
- CDN integration

### Backend Optimization
- Database indexing
- Caching strategies
- Load balancing
- CDN for static assets

## 📱 Domain Configuration

### Custom Domain Setup
1. **Frontend**
   - Configure DNS A record
   - Set up SSL certificate
   - Update environment variables

2. **Backend**
   - Configure subdomain (api.yourdomain.com)
   - Set up reverse proxy
   - Configure CORS

## 🔄 Backup Strategy

### Database Backup
```bash
# MongoDB backup script
mongodump --uri="mongodb+srv://username:password@cluster.mongodb.net/lexicon-academy" --out=/backup/$(date +%Y%m%d)
```

### Automated Backups
- MongoDB Atlas: Automated backups
- File system: Daily backups
- Code repository: Git version control

## 🎯 Post-Deployment Checklist

- [ ] SSL certificates configured
- [ ] Environment variables set
- [ ] Database connection working
- [ ] Email sending configured
- [ ] File uploads working
- [ ] Rate limiting active
- [ ] Monitoring enabled
- [ ] Backup strategy implemented
- [ ] Security headers configured
- [ ] Performance testing completed
- [ ] User testing completed
- [ ] Documentation updated

## 🆘 Troubleshooting

### Common Issues
1. **Database Connection**
   - Check connection string
   - Verify IP whitelist
   - Check credentials

2. **CORS Issues**
   - Verify frontend URL in CORS config
   - Check preflight requests

3. **Build Failures**
   - Check Node.js version
   - Verify dependencies
   - Check environment variables

4. **Performance Issues**
   - Monitor database queries
   - Check response times
   - Analyze bundle size

### Support Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.mongodb.com/atlas)
- [Next.js Documentation](https://nextjs.org/docs)
