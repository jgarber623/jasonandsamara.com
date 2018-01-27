require 'html-proofer'

namespace :test do
  desc 'Check the site with HTMLProofer'
  task :html do
    unless File.directory?('./public')
      puts '=> Building site to `./public`...'
      Rake::Task['build'].invoke
    end

    puts '=> Checking site with HTMLProofer...'
    HTMLProofer.check_directory('./public', {
      assume_extension: true,
      empty_alt_ignore: true,
      only_4xx: true,
      url_ignore: [/crateandbarrel.com/]
    }).run
  end

  desc 'Lint JavaScript with ESLint'
  task :javascript do
    puts '=> Linting JavaScript with ESLint...'
    system('eslint src/_assets/javascripts') or raise
  end

  desc 'Lint stylesheets with Sass Lint'
  task :sass do
    puts '=> Linting stylesheets with Sass Lint...'
    system('sass-lint --no-exit --verbose') or raise
  end
end

task test: ['test:html', 'test:javascript', 'test:sass']
