def euclid a, b
#this function is recursive
	if b == 1
		puts a
	elsif a > b
		puts ( a - ( a % b) ) / b
		euclid b, ( a % b)
	end
end

euclid 67, 45