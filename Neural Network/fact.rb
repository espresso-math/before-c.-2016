def fact! n
	l = 1
	n.times do |i|
		l *= (i+1)
	end
	return l
end
def power n,p
	h = 1
	p.times do 
		h = h * n
	end
	return h
end

puts fact! 900000


