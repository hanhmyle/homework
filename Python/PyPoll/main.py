#Hanh Le
import csv

def OutputToTextFile(outputResultArr):    
    output_path = "./Resources/election_data_output.txt"   
    with open(output_path, 'w+') as textfile:
        for result in outputResultArr:
            textfile.write(result)
            textfile.write("\n")
        
csvpath = './Resources/election_data.csv'
with open(csvpath, 'r') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',') 
    next(csvreader) #subtract header
    print(csvreader)
    candidates = {}
    total_votes = 0
    for row in csvreader:
        total_votes += 1
        if row[2] in candidates:
            candidates[row[2]].append(row[0])
        else:
            candidates[row[2]] = [row[0]]        

    totalVotesPerCandidateDict = {}
    outputResultArr = [] #store result in here to re-use it later in text output file
    outputResultArr.append("Election Results")
    outputResultArr.append("-------------------------------------------------")
    outputResultArr.append("Total Votes: "+ str(total_votes)) 
    outputResultArr.append("-------------------------------------------------")
    for key in candidates:
        totalVotePercent = len(candidates[key])/total_votes
        outputResultArr.append(key + ": " +str("{:.3%}".format(totalVotePercent)) + " ("+str(len(candidates[key]))+")") 
        totalVotesPerCandidateDict[key] = totalVotePercent
    winner = max(totalVotesPerCandidateDict, key=totalVotesPerCandidateDict.get)    
    outputResultArr.append("-------------------------------------------------")
    outputResultArr.append("winner: "+ winner) 
    outputResultArr.append("-------------------------------------------------")     
    
    for result in outputResultArr: #output to screen
        print(result)
    OutputToTextFile(outputResultArr) #all done, write to text file



