import random
def gen():
    d = []
    f = open("adjlist.txt")
    for t in f:
        c = t.replace("\n","")
        d.append(c)

    return random.choice(d)


pas = ""
for i in range(10):
    pas = pas+ gen() + " "

print pas

