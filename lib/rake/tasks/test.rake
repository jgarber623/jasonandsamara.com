require 'html-proofer'

desc 'Test the site with html-proofer and sass-lint'
task :test do
  puts '=> Building site to ./public...'
  Rake::Task['build'].invoke unless File.directory?('./public')

  puts '=> Checking site with HTMLProofer...'
  HTMLProofer.check_directory('./public', {
    assume_extension: true,
    empty_alt_ignore: true,
    only_4xx: true,
    url_ignore: [/crateandbarrel.com/]
  }).run

  puts '=> Linting JavaScript with ESLint...'
  system 'eslint src/_assets/javascripts'

  puts '=> Linting stylesheets with Sass Lint...'
  system 'sass-lint --no-exit --verbose'
end
