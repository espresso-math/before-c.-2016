def bit_inverse( string )
	len = string.length
	output = ""
	for i in 0...len
		if string[ i ] == "1"
			output += "0"
		else
			output += "1"
		end
	end
	output
end

text = gets.chomp
loop do 
	text += bit_inverse( text )
	unless text.length > 10
		next
	else
		break
	end
end
puts text