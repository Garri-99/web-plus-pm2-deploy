require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps : [{
    name   : "app1",
    script : "./build"
  }],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/Garri-99/web-plus-pm2-deploy.git',
      path: DEPLOY_PATH,
      'pre-deploy-local': `npm run build && scp -Cr ./build/* ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/source/frontend`,
      'post-deploy': 'cd frontend && pm2 startOrRestart ecosystem.config.js',
    },
  },
}
