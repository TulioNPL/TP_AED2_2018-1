#encoding UTF-8

'''
    Metodo principal do programa que lê os dados
    dos arquivos html de copas e printa na tela
    todas as partidas de todas as copas
    '''
from partida import Partida
from readFiles import readFiles

input = open('entrada.txt','r')
inputs = []
line = input.readline()
while line != '0\n':
    inputs.append(int(line))
    line = input.readline()

for numbers in inputs:
    readFiles.readFile(numbers)
