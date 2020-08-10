import binascii
#This is a base 64 converter.
def asc_2_bin(alphabet):
    out = bin(int(binascii.hexlify(alphabet), 16))
    t = out.replace("0b","")
    return t
def join_t(inpu_t):
    string = ""
    for i in inpu_t:
        h = asc_2_bin(i)
        string = string + h
    return string
def check_four(inpu_t):
    if len(inpu_t) % 7 == 0:
        return "yes"
    else:
        return "no"
        
print check_four(join_t("qwert"))
