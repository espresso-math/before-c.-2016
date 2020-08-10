import time
class Session(object):
    def __init__(self, start):
        self.start = start

    def startTimer(self, timelimit):
        n = timelimit
        #convert to miniutes
        m = n * 60
        #convert to seconds
        s = m * 60
        time.sleep(s)
    

    def stopTimer(self):
        print "Timer stopped!"

    def newThread(self, name, description, timelimit):
        f = open("SessionID.txt","a")
        f.write("*********************" + '\n')
        f.write("Name: " + name + '\n')
        print "Name: " + name
        f.write("Description: " + description + '\n')
        print "Description: " + description
        f.write("Time: " + str(timelimit) + '\n')
        print "Timelimit: " + str(timelimit)
        print "Started a new Session!"
        

for t in range(9000):
    q0 = raw_input("Do you want to create a new Session?y/n  ")
    if q0 == 'y' or q0 == 'Y':
        name = raw_input("Enter name: ")
        description = raw_input("Enter a short description: ")
        timelimit = input("Provide timelimit in hours(use decimals)")
        go = Session("yes")
        go.newThread(name, description, timelimit)
        go.startTimer(timelimit)
        go.stopTimer()
        
        
        
    
        
        
