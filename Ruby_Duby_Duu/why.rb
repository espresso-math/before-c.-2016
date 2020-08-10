require_relative 'wordlist'

loop do
	# Get evil idea and swap in code words
	print "Enter your new idea: " 
	idea = gets
	if idea.strip == 'exit'
		break
	end
	$code_words.each do |real, code| 
	  idea.gsub!( real, code )
	end

	# Save the jibberish to a new file
	print "File encoded.  Please enter a name for this idea: " 
	idea_name = gets.strip
	File::open( "idea-" + idea_name + ".txt", "w" ) do |f|
	  f << idea
	end
end
