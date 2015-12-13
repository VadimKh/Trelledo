require('shelljs/global');

echo('clean public dir');
rm('-rf', 'public/www/*');

echo('start webpack build');
exec('build');

cd('public');
exec('build');
