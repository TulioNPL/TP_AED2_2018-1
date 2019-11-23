/*******************************************************************************
*Autor: Tulio N. Polido Lopes
*Data: 19/02/2018
*Nome do programa: TP01Q08
*Objetivo: Criar um programa que leia e analise os caracteres em uma pagina da web
*******************************************************************************/

import java.net.*;
import java.io.*;

class TP01Q08{
	public static void main(String[] args){
		String[] entrada = new String[1000];
		String[] paginas = new String[500];
		int qtdEntrada = leEntrada(entrada);
		
		for(int i = 1; i < qtdEntrada; i+=2){
			paginas[i] = lePagina(entrada[i]);
			analise(paginas[i],entrada[i-1]);	
		}//fim for

		
	}//fim main()

/****************************************************************************
*Metodo: leEntrada()
*Entrada: Um array de Strings
*Saida: Um valor inteiro referente a quantidade de entradas lidas
****************************************************************************/
	public static int leEntrada(String[] entrada){
		int qtdEntrada = 0;
		
		do{
			entrada[qtdEntrada] = MyIO.readLine();
		}while(entrada[qtdEntrada++].equals("FIM") == false);
		qtdEntrada--;	//Ignora a entradda "FIM"

		return qtdEntrada;
	}//fim leEntrada()

	public static String lePagina(String entrada){
		String pagina = "";
		
		try{
			URL url = new URL(entrada);
			URLConnection conn = url.openConnection();
			
			InputStream is = url.openStream();
			InputStreamReader isr = new InputStreamReader(is);
			BufferedReader br = new BufferedReader(isr);
	
			String linha = br.readLine();
	
			while(linha != null){
				pagina = pagina + linha + "\n";
				linha = br.readLine();
			}//fim while
	
		}//fim try
		catch(MalformedURLException malformedURLException){
			MyIO.println("Falha na conexao com a pagina");
		}//fim catch
		catch(IOException ioException){
			MyIO.println("Erro na leitura!");
		}//fim catch
		
		return pagina;
	}//fim lePagina()
	
/****************************************************************************
*Metodo: analise()
*Entrada: Uma string referente a pagina lida e uma String referente ao nome da pagina
*Saida: Nenhuma
****************************************************************************/
	public static void analise(String pag,String nome){
		char aux;
		int j;
		int tam = pag.length();
		int a=0, e=0, i=0, o=0, u=0,				//contadores de vogais
		    aAgudo=0, eAgudo=0, iAgudo=0, oAgudo=0, uAgudo=0, 	//contadores de vogais con acento agudo
		    aGrave=0, eGrave=0, iGrave=0, oGrave=0, uGrave=0,	//contadores de vogais com acento grave
		    aTil=0, oTil=0,					//contadores de vogais com til
		    aCirc=0, eCirc=0, iCirc=0, oCirc=0, uCirc=0,	//contadores de vogais com acento circunflexo
                    consoantes = 0,
                    padraoBR = 0, padraoTable = 0;			//contadore padroes <br> e <table>
		boolean ehLetra;
		boolean ehVogal;

		for(j = 0; j < tam; j++){
			aux = pag.charAt(j);
			ehLetra = aux >= 'a' && aux <='z';
			ehVogal = aux == 'a' ||
			   	  aux == 'e' ||
				  aux == 'i' ||
				  aux == 'o' ||
				  aux == 'u';

			switch(aux){
				case 'a':
					a++;
					break;
				case 'e':
					e++;
					break;
				case 'i':
					i++;
					break;
				case 'o':
					o++;
					break;
				case 'u':
					u++;
					break;
				case 'á':
					aAgudo++;
					break;
                                case 'é':
					eAgudo++;
					break;
                                case 'í':
					iAgudo++;
					break;
                                case 'ó':
					oAgudo++;
					break;
                                case 'ú':
					uAgudo++;
					break;
				case 'à':
					aGrave++;
					break;
                                case 'è':
					eGrave++;
					break;
                                case 'ì':
					iGrave++;
					break;
                                case 'ò':
					oGrave++;
					break;
                                case 'ù':
					uGrave++;
					break;
				case 'ã':
					aTil++;
					break;
                                case 'õ':
					oTil++;
					break;
                                case 'â':
					aCirc++;
					break;
                                case 'ê':
					eCirc++;
					break;
                                case 'î':
					iCirc++;
					break;
				case 'ô':
					oCirc++;
					break;
                                case 'û':
					uCirc++;
					break;
				case '<':
					if(pag.charAt(j+1) == 'b' &&
					   pag.charAt(j+2) == 'r' &&
					   pag.charAt(j+3) == '>'){

						padraoBR++;
					}//fim if
					else if(pag.charAt(j+1) == 't' &&
                                                pag.charAt(j+2) == 'a' &&
                                                pag.charAt(j+3) == 'b' &&
                                                pag.charAt(j+4) == 'l' &&
                                                pag.charAt(j+5) == 'e' &&
                                        	pag.charAt(j+6) == '>'){ 

						padraoTable++;
                                        }//fim if

					break;
                                default:
					if(ehLetra && !ehVogal) consoantes++;
					break;
			}//fim switch
		}//fim for
		
		System.out.println("a("+a+") e("+e+") i("+i+") o("+o+") u("+u+") á("+aAgudo+") é("+eAgudo+
			     ") í("+iAgudo+") ó("+oAgudo+") ú("+uAgudo+") à("+aGrave+") è("+eGrave+") ì("+iGrave+
			     ") ò("+oGrave+") ù("+uGrave+") ã("+aTil+") õ("+oTil+ 
			     ") â("+aCirc+") ê("+eCirc+") î("+iCirc+") ô("+oCirc+") û("+uCirc+
		   	     ") consoante("+consoantes+") <br>("+padraoBR+") <table>("+padraoTable+") "+nome);
	}//fim analise()
}//fim class TP01Q08
