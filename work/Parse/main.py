# to generate compounds and gerunds of nouns
list = []
f = open('nounlist.txt')
for t in f:
    u = t.replace('\n', '')
    if u[len(u)-1] == "s" or u[len(u)-1] == "x" or u[len(u)-1] == "o":
        output = u + "es"
        list.append(output)
    elif u[len(u)-2:] == "ss" or u[len(u)-2:] == "sh" or u[len(u)-2:] == "ch":
        output = u + "es"
        list.append(output)
    elif u[len(u)-1] == "y":
        output = u[:len(u)-1] + "ies"
        list.append(output)
    else:
        output = u + "s"
        list.append(output)
f.close()
r = open('nounplgen.txt' ,'a')
for t in list:
    r.write(t + '\n')
