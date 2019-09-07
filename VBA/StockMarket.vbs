'Hanh Le

Sub StockMarketAnalysis()
    Dim ticker As String
    totalWsCount = ThisWorkbook.Worksheets.Count
    Dim thisWorksheet As Worksheet
    Dim bestValue As Double
    Dim worseValue As Double
    Dim mostValue As Double
    
    For i = 1 To totalWsCount
        Set thisWorksheet = ThisWorkbook.Worksheets(i)
        thisWorksheet.Cells(1, 9).Value = "Ticker"
        thisWorksheet.Cells(1, 10).Value = "Yearly Change"
        thisWorksheet.Cells(1, 11).Value = "Percent Change"
        thisWorksheet.Cells(1, 12).Value = "Total Stock Volume"
        thisWorksheet.Columns(11).NumberFormat = "0.00%"
        
        'best/worse performance
        thisWorksheet.Cells(2, 15).Value = "Greatest % Increase"
        thisWorksheet.Cells(3, 15).Value = "Greatest % Decrease"
        thisWorksheet.Cells(4, 15).Value = "Greatest Total Volume"
        thisWorksheet.Cells(1, 16).Value = "Ticker"
        thisWorksheet.Cells(1, 17).Value = "Value"
        thisWorksheet.Cells(2, 17).NumberFormat = "0.00%"
        thisWorksheet.Cells(3, 17).NumberFormat = "0.00%"
        
        currentRowToSetValue = 2 'start row 2 since row 1 is header
        totalVolume = 0
        yearlyChange = 0
        percentChange = 0
        openingPrice = 0
        closingPrice = 0
        percentChange = 0
        bestValue = 0
        worseValue = 0
        mostValue = 0
        
        
        For j = 2 To thisWorksheet.Cells(Rows.Count, 1).End(xlUp).Row 'insert new ticker and volume
            totalVolume = totalVolume + thisWorksheet.Cells(j, 7).Value 'capture the current volume
            
            
            If thisWorksheet.Cells(j, 1).Value <> thisWorksheet.Cells(j - 1, 1).Value Then 'opening price
                openingPrice = thisWorksheet.Cells(j, 3).Value
            End If
            
            If thisWorksheet.Cells(j, 1).Value <> thisWorksheet.Cells(j + 1, 1).Value Then 'compare with the next row if ticker has changed
                thisWorksheet.Cells(currentRowToSetValue, 9).Value = thisWorksheet.Cells(j, 1).Value
                thisWorksheet.Cells(currentRowToSetValue, 12).Value = totalVolume
                
                closingPrice = thisWorksheet.Cells(j, 6).Value
                yearlyChange = closingPrice - openingPrice
                If openingPrice > 0 Then
                    percentChange = yearlyChange / openingPrice
                End If
                
                thisWorksheet.Cells(currentRowToSetValue, 10).Value = yearlyChange
                thisWorksheet.Cells(currentRowToSetValue, 11).Value = percentChange
                
                If percentChange < 0 Then 'format percent col
                    thisWorksheet.Cells(currentRowToSetValue, 11).Font.ColorIndex = 3
                End If
                                
                If yearlyChange >= 0 Then 'format yearchange col
                    thisWorksheet.Cells(currentRowToSetValue, 10).Interior.ColorIndex = 4 'green
                Else
                    thisWorksheet.Cells(currentRowToSetValue, 10).Interior.ColorIndex = 3 'red
                End If
                
                
                If j = 2 Then
                    'bestValue = thisWorksheet.Cells(2, 11).Value
                    'worseValue = thisWorksheet.Cells(2, 11).Value
                    'mostValue = thisWorksheet.Cells(2, 12).Value
                Else
                    'best worse values
                    If thisWorksheet.Cells(currentRowToSetValue, 11).Value > bestValue Then
                        bestValue = thisWorksheet.Cells(currentRowToSetValue, 11).Value
                        bestTicker = thisWorksheet.Cells(currentRowToSetValue, 9).Value
                    End If
        
                    If thisWorksheet.Cells(currentRowToSetValue, 11).Value < worseValue Then
                        worseValue = thisWorksheet.Cells(currentRowToSetValue, 11).Value
                        worseTicker = thisWorksheet.Cells(currentRowToSetValue, 9).Value
                    End If
                    
                    If thisWorksheet.Cells(currentRowToSetValue, 12).Value > mostValue Then
                        mostValue = thisWorksheet.Cells(currentRowToSetValue, 12).Value
                        mostTicker = thisWorksheet.Cells(currentRowToSetValue, 9).Value
                    End If
                End If

                currentRowToSetValue = currentRowToSetValue + 1 'increase counter
                
                'reset
                totalVolume = 0
                yearlyChange = 0
                closingPrice = 0
                openingPrice = 0
                percentChange = 0
            End If
            
        Next j 'next row
        'best, worse, best summary
        thisWorksheet.Cells(2, 16).Value = bestTicker
        thisWorksheet.Cells(2, 17).Value = bestValue
        thisWorksheet.Cells(3, 16).Value = worseTicker
        thisWorksheet.Cells(3, 17).Value = worseValue
        thisWorksheet.Cells(4, 16).Value = mostTicker
        thisWorksheet.Cells(4, 17).Value = mostValue
    Next i 'next worksheet
End Sub