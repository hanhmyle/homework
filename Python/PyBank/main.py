#Hanh Le

import csv

def OutputToTextFile(outputResultArr):    
    output_path = "./Resources/election_data_output.txt"   
    with open(output_path, 'w+') as textfile:
        for result in outputResultArr:
            textfile.write(result)
            textfile.write("\n")
            
csvpath = './Resources/budget_data.csv'
with open(csvpath, 'r') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    next(csvreader) #subtract header


    buget_data_dict = {}
    outputArray = []
    
    for row in csvreader:
        if row[0] in buget_data_dict:
            buget_data_dict[row[0]].append(float(row[1]))
        else:
            buget_data_dict[row[0]] = [float(row[1])] 
    total_profit_lost = 0    
    
    for key in buget_data_dict:
        total_profit_lost += sum(buget_data_dict[key])
        if buget_data_dict[key] == max(buget_data_dict.values()):
            outputArray.append("Greatest Increase in Profits: "+ key + " ("+str("${0:.0f}".format(buget_data_dict[key][0]))+")")
        if buget_data_dict[key] == min(buget_data_dict.values()):
            outputArray.append("Greatest Decrease in Profits: "+ key + " ("+str("${0:.0f}".format(buget_data_dict[key][0]))+")")
    outputArray.insert(0, "Total Months: "+ str(len(buget_data_dict)))
    outputArray.insert(1, "Total: $"+ str("{0:.0f}".format(total_profit_lost)))
    outputArray.insert(2, "Average Change: "+ str("{0:.2f}".format(total_profit_lost/len(buget_data_dict))))
    
    for result in outputArray: #output to screen
        print(result)
    OutputToTextFile(outputArray) #all done, write to text file        
  
 