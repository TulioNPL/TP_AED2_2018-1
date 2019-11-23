#encoding ISO-8859-1
from partida import Partida

class readFiles:
    def removeTags(page):
        '''Recieves a String and remove the html tags'''
        newPage = ''
        canRead = True

        for char in page:
            if char == '<' or char == '&':
                canRead = False
            if canRead:
                newPage += char

            if char == '>' or char == ';':
                canRead = True
        return newPage

    def readFile(year):
        '''Reads the World Cup file and cleans the data'''
        arqName = '/Users/tulionpl/Desktop/mac.folder/python/classePartida/copa/' + str(year) + '.html'

        file = open(arqName,'r',encoding="ISO-8859-1")
        line = file.readline()
        page = ''

        canRead = False
        while '<tr bgcolor="#000000">' not in line:
            if '<table cellspacing="1">' in line:
                canRead = True
            if canRead:
                page += line
            line = file.readline()

        page = readFiles.removeTags(page)
        data = page.split('\n')

        cleanData = []
        for dataLine in data:
            if readFiles.hasAlphanumericChar(dataLine):
                cleanData.append(dataLine)

        for i in range(len(cleanData)):
            cleanData[i] = cleanData[i].strip()

        Partida.createMatches(cleanData,year)

        file.close()

    def hasAlphanumericChar(line):
        '''See if the string has at least one alphanumeric char'''
        hasAlphanumeric = False

        for character in line:
            if (character > '0' and character < '9') or (character > 'A' and character < 'Z') or (character >'a' and character < 'z') :
                hasAlphanumeric = True

        return hasAlphanumeric
