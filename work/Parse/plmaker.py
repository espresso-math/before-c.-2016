# to generate compounds and gerunds of nouns
list = []
f = open('nounlist.txt')
for t in f:
    u = t.replace('\n', '')
    
    if 
    elif u[len(u)-2] == "ie":
        output = u[len(u)-2] + "ying"
        list.append(output)
    elif u[len(u)-1] == "e":
        output = u[:len(u)-1] + "ing"
        list.append(output)
    elif u[len(u)-1] == "y":
        output = u + "ing"
        list.append(output)
    else:
        output = u + "s"
        list.append(output)
f.close()
r = open('noungerundgen.txt' 'a')
for t in list:
    r.write(t + '\n')
