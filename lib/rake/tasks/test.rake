require 'html-proofer'

desc 'Test the site with html-proofer and sass-lint'
task :test do
  Rake::Task['build'].invoke unless File.directory?('./public')

  HTMLProofer.check_directory('./public', {
    assume_extension: true,
    empty_alt_ignore: true,
    only_4xx: true,
    url_ignore: [/crateandbarrel.com/]
  }).run

  sh 'sass-lint -v -q'
end
