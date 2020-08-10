#Ceaser's cipher copyright 500 BC~ Julius Ceasar.
#Written by JamesPowell.



#This validates the string and adds extra space required for a proper ceaser's cipher input.
for c in range(0,100):
    def check(input,key_1):
        x = len(input)
    
        a = key_1**2
        if x <= a:
            y = a - x
            for i in range(0,y):
                input = input + '_'
    
        return input
#This is the actual engine for encryption.
    def c_code(clear,key_2):
        output = ''
        b = key_2**2
        for i in range(0,(b-1)):
            for j in range(0,b,key_2):
                    output = output + clear[j+i]
                    
            if (j+i) == (b-1):
                break
       #print len(output)    
        return output
#This is almost the same as above except for the fact that the decryption engine also has to format the text after decryption.
    def c_code_2(clear,key_2):
        output = ''
        b = key_2**2
        for i in range(0,(b-1)):
            for j in range(0,b,key_2):
                    output = output + clear[j+i]
                    
            if (j+i) == (b-1):
                break
        chu = output.replace("~"," ")
        hjk = chu.replace("|","\n")
        hkl = hjk
        return hkl
    
    
  #Generates the key for the cipher to work -- that is rounds the length of the sting to the nearest perfect square.         

    def key(enter):
        n = len(enter)
        flag = 0
        for flag in range(0,100):
            if flag >= n**0.5:
                break
            
        
        return  flag







#Actual execution happens here.

    original = raw_input('Enter your message/scrambled text: ')
    print '___________________________________________________________'
    if original != '' :
        hj = original.lower()
        cpy = hj.replace(" ","~")
        copy = cpy.replace("\n","|")
        key = key(copy)
        p = input("Do you want to encode or decode? 0/1")
        if p == 0:
            print 'This is the scrambled text:'
            print c_code(check(copy,key),key)
        elif p == 1:
            print 'This is the clear text:'
            print c_code_2(check(copy,key),key)
        else:
            print "Try Again"
            continue
        print '___________________________________________________________'
        u = raw_input('Do you wish to continue? y/n')
        if u == 'n' or u =='N' :
            quit()
        else:
            continue
            
    
    else:
        print "Try Again"
        
        
