module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'API',
      script    : '/root/blol/app.js/build/src/index.js',
      watch	: true,
      env: {
        "NODE_ENV": "dev"
      },
      env_production : {
        "NODE_ENV": "production"
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'root',
      host : 'ip-172-31-0-227',
      ref  : 'origin/master',
      repo : 'git@github.com:manovagyanik1/blol.git',
      path : '/root/blol',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
