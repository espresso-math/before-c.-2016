
        


def isnoun(input):
    y = input.lower()
    f = open('nounlist.txt')
    boo = False
    for t in f:
        h = t.replace('\n','')
        if y == h:
            boo = True
    f.close()
    return boo

def isverb(input):
    y = input.lower()
    f = open('verblist.txt')
    boo = False
    for t in f:
        h = t.replace('\n','')
        if y == h:
            boo = True
    f.close()
    return boo

def isadj(input):
    y = input.lower()
    f = open('adjlist.txt')
    boo = False
    for t in f:
        g = t.replace('\n','')
        h = g.lower()
        if y == h:
            boo = True
    f.close()
    return boo



    
def nounpl(input):
    endings = ['es','s','ies']          
    # Rules
    if input[len(input)-2:] == "ies":
        output = input[:len(input)-2] + "y"
        return output
    elif input[len(input)-1:] == "es":
        output = input[:len(input)-1]
        return output
    elif input[len(input)] == 's':
        output  = input[:len(input)]
    else:
        output = "qwernone"
        return output
def noungerund(input):
    if input[len(input) - 3:] == "ying":
        output = input[:len(input)-3] + "y"
        return output
    elif 
        
        
