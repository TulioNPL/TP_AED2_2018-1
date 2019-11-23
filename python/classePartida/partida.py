'''
    Classe que representa as partidas das copas:
        teamOne - String que representa o time um
        teamTwo - String que representa o time dois
        ScoreOne - int que representa os gols do time um
        ScoreTwo - int que representa os gols do time dois
        city - String que representa a cidade da partida
        day - int que representa o dia
        month - int que representa o mes
        year - int que representa o ano
        phase - String que representa a Fase
    '''

class Partida:
    '''
        Classe que representa as partidas das copas:
        teamOne - String que representa o time um
        teamTwo - String que representa o time dois
        ScoreOne - int que representa os gols do time um
        ScoreTwo - int que representa os gols do time dois
        city - String que representa a cidade da partida
        day - int que representa o dia
        month - int que representa o mes
        year - int que representa o ano
        phase - String que representa a Fase
        '''
    def __init__(self,teamOne,teamTwo,scoreOne,scoreTwo,city,day,month,year,phase):
        '''Construtor da classe'''
        self.teamOne = teamOne
        self.teamTwo = teamTwo
        self.scoreOne = scoreOne
        self.scoreTwo = scoreTwo
        self.city = city
        self.day = day
        self.month = month
        self.year = year
        self.phase = phase

    def __str__(self):
        '''Retorna a Partida como string'''
        return "[COPA %i] - %s - %i/%i - %s (%i) x (%i) %s - %s" %(self.year,self.phase,self.day,
                                                                 self.month,self.teamOne,self.scoreOne,
                                                                 self.scoreTwo,self.teamTwo,self.city)
    def __repr__(self):
        '''Retorna a Partida como string'''
        return "COPA %i - %s - %i/%i - %s (%i) x (%i) %s - %s" %(self.year,self.phase,self.day,
                                                                 self.month,self.teamOne,self.scoreOne,
                                                                 self.scoreTwo,self.teamTwo,self.city)
    def getDate(data,op):
        '''Retorna o dia se OP == 0 ou mes se OP == 1'''
        date = data.split('/')
        result = 0
        if op == 0:
            result = int(date[0])
        else:
            result = int(date[1])

        return result

    def getScore(data,op):
        '''Retorna o placar do time 1 se OP == 0 ou placar do time 2 se OP == 1'''
        score = data.split(' x ')
        result = 0
        if op == 0:
            result = int(score[0])
        else:
            result = int(score[1])
            
        return result

    def createMatches(data,year):
        '''Recebe os dados da Copa e atribuir às intancias das partidas'''
        matches = []
        day = 0
        month = 0
        city = ''
        teamOne = ''
        teamTwo = ''
        scoreOne = 0
        scoreTwo = 0
        phase = ''

        i = 0
        
        while(i < len(data)):
            if 'GRUPO' in data[i] or 'FINA' in data[i] or 'Disp' in data[i]:
                phase = data[i]
                i+=1

            day = Partida.getDate(data[i],0)
            month = Partida.getDate(data[i],1)
            i+=1
            teamOne = data[i]
            i+=1
            scoreOne = Partida.getScore(data[i],0)
            scoreTwo = Partida.getScore(data[i],1)
            i+=1
            teamTwo = data[i]
            i+=1
            city = data[i]
            i+=1
            newMatch = Partida(teamOne,teamTwo,scoreOne,scoreTwo,city,day,month,year,phase)
            matches.append(newMatch)

        for i in range(len(matches)):
            print(matches[i])











