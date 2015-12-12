require('shelljs/global');

echo('clean public dir');
rm('-rf', 'public/*');

echo('set NODE_ENV to production');
env['NODE_ENV'] = 'production';
echo('NODE_ENV is ' + env['NODE_ENV']);
echo('start webpack build');
exec('build');

cd('public');
exec('python ../crosswalk/make_apk.py --package=org.crosswalkproject.example --manifest=manifest.json');
