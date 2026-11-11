require 'yaml'
# SKILL bodies contain UTF-8 (em-dashes, arrows); read UTF-8 explicitly so the check
# also passes on a non-UTF-8 shell (LANG=C), not only on CI's UTF-8 runner.
Dir.glob('{skills/*/SKILL.md,agents/*.md,rules/*.mdc,commands/*.md}').each do |file|
  text = File.read(file, encoding: 'UTF-8')
  raise "Missing frontmatter: #{file}" unless text.start_with?("---\n")
  data = YAML.safe_load(text.split("---", 3)[1])
  raise "Invalid YAML object: #{file}" unless data.is_a?(Hash)
  raise "Missing description: #{file}" unless data['description'].is_a?(String) && !data['description'].empty?
  if file.start_with?('skills/')
    raise "Skill name mismatch: #{file}" unless data['name'] == File.basename(File.dirname(file))
  end
  if file.start_with?('agents/')
    raise "Invalid agent name: #{file}" unless data['name'].is_a?(String) && data['name'].match?(/\A[a-z0-9]+(?:-[a-z0-9]+)*\z/)
  end
  if file.start_with?('commands/')
    raise "Command name mismatch: #{file}" unless data['name'] == File.basename(file, '.md')
  end
  raise "Rule unexpectedly always on" if file.start_with?('rules/') && data['alwaysApply'] != false
end
puts 'PASS: YAML frontmatter'
