

def number_of_times(input,alph):
    flag = 0
    for i in range(0,len(input)):
        chk = input[i].find(alph)
        if chk == 0:
            flag = flag + 1
    return flag
def sort(input):
    for j in range(len(input)):
        for i in range(len(input)):
            try:
                if input[i+1] > input[i]:
                    copy = input[i]
                    input[i] = input[i+1]
                    input[i+1] = copy
            except Exception:
                pass
    return input
def sortwith(inarr):
    alp = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    for j in range(len(alp)):
        for i in range(len(alp)):
            try:
                if inarr[i+1] > inarr[i]:
                    copy = inarr[i]
                    inarr[i] = inarr[i+1]
                    inarr[i+1] = copy
                    copy2 = alp[i]
                    alp[i] = alp[i+1]
                    alp[i+1] = copy2
            except Exception:
                pass
    return alp
def all(input):
    each = []
    aah = []
    alphabet = "abcdefghijklmnopqrstuvwxyz"
    for i in range(0,26):
        do = number_of_times(input,alphabet[i])
        each.append(alphabet[i])
        aah.append(do)
    return aah

def main():
    input = raw_input("Enter text:")
    inputarr =  all(input)
    alpha = sortwith(inputarr)
    new = sort(inputarr)
    for i in range(26):
        print alpha[i] + " - " + str(new[i])
for i in range(1000):
    main()












    
    
