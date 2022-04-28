module.exports = {
  apps: [
    {
      name: 'playground webservice', // 애플리케이션 이름
      script: 'npm', // pm2 시작에 대한 시작 파일 경로
      args: 'start', // CLI로 실행되는 인자
      // instances: 0,
      // exec_mode: 'cluster',
      // autorestart: true,
      watch: ['.nuxt'],
      ignore_watch: ['node_modules'],
      watch_delay: 1000,

      output: '~/logs/pm2/console.log',
      error: '~/logs/pm2/onsoleError.log',

      // intances: 0, // 인스턴스 수를 결정할 수 있으며, 0으로 작성하면 현재 가능한 CPU 코어 수만큼 실행됩니다.
      // exec_mode: 'cluster', // fork모드로 실행할지, cluster모드로 실행할지 선택
      // autorestart: true,
      // max_memory_restart: '2G',
      // watch: ['server', 'client'],
      // watch_delay: 1000,
      // ignore_watch: ['node_modules'],

      // env: {
      //   PORT: 3000,
      //   NODE_ENV: 'development',
      // },
      // env_production: {
      //   PORT: 5000,
      //   NODE_ENV: 'production',
      // },
    },
  ],
}
