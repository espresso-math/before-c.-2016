#cycle through the whole text
#take each word and put it in an array. if the word already exists then put a tally mark in another array.
def cycle():
    f = open("file.txt", "r")
    words = f.read().split()
    for w in words:
        print w
def main():
    cycle()
for i in range(200):
    main()
