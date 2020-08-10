def dec2bin(number)
    number = Integer(number)
    if(number == 0) then 0 end
        
    ret_bin = ""
    while(number != 0)
        ret_bin = String(number % 2) + ret_bin
        number = number / 2
    end
    ret_bin
end
def padding bin_ary
	output = ""
	unless bin_ary.length == 12
		(12 - bin_ary.length).times do 
			output = output << "0"
		end
		output = output << bin_ary
	end
end
