/*******************************************************************************
*Autor: Tulio N. Polido Lopes
*Data: 16/02/2018
*Nome do programa: TP01Q09
*Objetivo: Criar um programa que leia n valores reais, grave sequencialmente em um arquivo,
	   faca releitura de tras para frente e mostre na tela. 
********************************************************************************/

import java.io.*;

class TP01Q09{
	public static void main(String[] args){
		int n = MyIO.readInt();

		gravaDados(n);

		leArquivo(n);
	}//fim main()


	/********************************************************************************
	*Metodo: gravaDados()
	*Entrada: Um valor inteiro N referente a quantidade de numeros a serem lidos
	*Saida: Nenhuma
	********************************************************************************/
	public static void gravaDados(int n){
		try{
			RandomAccessFile raf = new RandomAccessFile("TP01Q09.txt", "rw");

			for(int i = 0; i < n; i++){
				raf.writeDouble(MyIO.readDouble());
			}//fim for
			
			raf.close();
		}//fim try
		catch(FileNotFoundException arqNaoEncontrado){
			MyIO.println("Arquivo nao encontrado!");
		}//fim catch
		catch(IOException erroGravacao){
			MyIO.println("Erro ao gravar no arquivo!");
		}//fim catch
	}//fim gravaDados()
	
	/********************************************************************************
        *Metodo: leArquivo()
        *Entrada: Um valor inteiro N referente ao numero de numeros lidos
        *Saida: Nenhuma
        ********************************************************************************/
	public static void leArquivo(int n){
		try{	
			RandomAccessFile raf = new RandomAccessFile("TP01Q09.txt","rw");
			double aux;

			for(int i = n-1; i >= 0; i--){	//i comeca da ultima posicao do arquivo(leitura inversa)
				raf.seek(i*8);	//8 eh a quantidade de bytes de um double
				aux = raf.readDouble();
				if(aux % 2 == 0 || aux % 2 == 1){ //Caso o numero nao tenha decimal, sera convertido para inteiro
					MyIO.println((int)aux);
				}//fim if
				else{
					MyIO.println(aux);
				}//fim else			
			}//fim for

			raf.close();
		}//fim try
		catch(FileNotFoundException arqNaoEncontrado){
                        MyIO.println("Arquivo nao encontrado!");
                }//fim catch
		catch(IOException erroLeitura){
			MyIO.println("Erro ao ler o arquivo!");
		}//fim catch
	}//fim leArquivo()
}//fim class TP01Q09
