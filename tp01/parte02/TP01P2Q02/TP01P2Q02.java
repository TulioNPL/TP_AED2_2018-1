/**********************************************************************************************
*Autor: Tulio N. Polido Lopes
*Data: 07/03/2018
*Objetivo: Criar uma Classe Partida que armazenara dados das partidas ocorridas nas copas
***********************************************************************************************/

import java.io.*;
import java.lang.*;

class Partida extends Object implements Cloneable{
	private static int qtdPartidas = 0;
	private int copa,
		    placar1,
		    placar2,
	  	    dia,
		    mes;
	private String etapa,
		       time1,
		       time2,
		       local;
	
	/***********************************************************************************
	*Metodos contrutores
	*Funcao: Criar intancias de Partida
	************************************************************************************/
	Partida(){
		this.copa = 0;
		this.placar1 = 0;
		this.placar2 = 0;
		this.dia = 0;
		this.mes = 0;
		this.etapa = "";
		this.time1 = "";
		this.time2 = "";
		this.local = "";
	}//fim Partida()
	Partida(int copa, int placar1, int placar2, int dia, int mes, String etapa, String time1, String time2, String local){
		this.setCopa(copa);
                this.setPlacar1(placar1);
                this.setPlacar2(placar2);
                this.setDia(dia);
                this.setMes(mes);
                this.setEtapa(etapa);
                this.setTime1(time1);
                this.setTime2(time2);
                this.setLocal(local);
	}//fim Partida()
	
	/******************************************************************************************
	*Metodos: get() e set()
	*Funcao: Pegar ou guardar valores nas variaveis privadas
	******************************************************************************************/
	public static int getQtdPartidas(){
		return qtdPartidas;
	}//fim getQtdPartidas()

	public int getCopa(){
		return this.copa;
	}//fim getCopa()
	public void setCopa(int copa){
		this.copa = copa;
	}//fim setCopa()

	public int getPlacar1(){
		return this.placar1;
        }//fim getCopa()
        public void setPlacar1(int placar1){
		this.placar1 = placar1;
        }//fim setCopa()
	public  int getPlacar2(){
		return this.placar2;
        }//fim getCopa()
        public  void setPlacar2(int placar2){
		this.placar2 = placar2;
        }//fim setCopa()
	
	public int getDia(){
		return this.dia;
        }//fim getCopa()
        public void setDia(int dia){
		this.dia = dia;
        }//fim setCopa()
	
	public int getMes(){
		return this.mes;
        }//fim getCopa()
        public void setMes(int mes){
		this.mes = mes;
        }//fim setCopa()

	public String getEtapa(){
		return this.etapa;
        }//fim getCopa()
        public void setEtapa(String etapa){
		this.etapa = etapa;
        }//fim setCopa()

	public String getTime1(){
		return this.time1;
        }//fim getCopa()
        public void setTime1(String time1){
		this.time1 = time1;
        }//fim setCopa()
	public String getTime2(){
		return this.time2;
        }//fim getCopa()
        public void setTime2(String time2){
		this.time2 = time2;
        }//fim setCopa()

	public String getLocal(){
		return this.local;
        }//fim getCopa()
        public void setLocal(String local){
		this.local = local;
        }//fim setCopa()
		
	/***************************************************************************************
	*Metodo: clone()
	*Funcao: clona os valores da partida reccebida para a corrente
	**************************************************************************************/
/*	public void clone(Partida p) {
		this.setCopa(p.getCopa());
                this.setPlacar1(p.getPlacar1());
                this.setPlacar2(p.getPlacar2());
                this.setDia(p.getDia());
                this.setMes(p.getMes());
                this.setEtapa(p.getEtapa());
                this.setTime1(p.getTime1());
                this.setTime2(p.getTime2());
                this.setLocal(p.getLocal());
	}//fim clone()
*/
	public Partida retornaClone() throws Exception{
			return (Partida)this.clone();
	}//fim clone()
	
	/********************************************************************************************
	*Metodo: imprimir() 
	*Funcao: imprimir na tela os dados da partida
	*********************************************************************************************/	
	public void imprimir(){
		MyIO.println("[COPA "+this.copa+"] - "+this.etapa+" - "+this.dia+"/"+this.mes+" - "+this.time1+
			     " ("+this.placar1+") x ("+this.placar2+") "+this.time2+"  - "+this.local);
	}//fim imprimir()

	/**********************************************************************************************
	*Metodo: ler()
	*Funcao: Le o arquivo de uma copa
	**********************************************************************************************/
	public static int ler(String copa, Partida[] partida) throws Exception{
		BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream("/tmp/copa/"+copa+".html"),"ISO-8859-1"));
		boolean ler = false;
		String dadosBrutos = "";
		String linha = br.readLine();
		int qtdPartidas = 0;

		do{
			if(linha.contains("<table cellspacing=\"1\">")){ 
				ler = true;
			}//fim if
			if(ler){
				dadosBrutos = dadosBrutos + linha + "\n";
			}//fim if

			linha = br.readLine();
		}while(linha.contains("<tr bgcolor=\"#000000\"><td colspan=\"5\">&nbsp;</td></tr>") == false);
		br.close();
		
		String pattern = "(?m)^\\s*\\r?\\n|\\r?\\n\\s*(?!.*\\r?\\n)";	//regex para reconhecimento das linhas em branco
		
		dadosBrutos = retiraTags(dadosBrutos);		
		dadosBrutos = dadosBrutos.replaceAll(pattern, "");	//retira as linhas em branco
		
		String dados[] = dadosBrutos.split("\n");	//transforma a String em um array de Strings separando pelo "\n"

		for(int i = 0; i < dados.length; i++){
			dados[i] = dados[i].replaceAll("\\s+"," ");	//retira espacos em branco em excesso
			dados[i] = dados[i].trim();
				
			if(dados[i].contains("/")) qtdPartidas++;
		}//fim for		
			
		criaPartidas(dados,copa,qtdPartidas,partida);

		return qtdPartidas;
	}//fim ler()
	
	/**********************************************************************************************
	*Metodo: criaPartidas()
	*Entrada: Um array de Strings contendo os dados
	*Funcao: Criar as intancias de Partida
	***********************************************************************************************/
	public static void criaPartidas(String[] dados, String copa, int qtd, Partida[] partida){
		boolean ehEtapa;

		int ano = Integer.parseInt(copa),
		    cont = 0,
		    placar1 = 0,
		    placar2 = 0,
		    dia = 0,
		    mes = 0;
		String etapa = "",
		       time1 = "",
		       time2 = "",
		       local = "";

		for(int i = 0; i < qtd; i++){
			ehEtapa = dados[cont].contains("GRUPO") || dados[cont].contains("FINAL") || dados[cont].contains("Disp.");

			if(ehEtapa){
				etapa = dados[cont];
				cont++;
			}//fim if

			int aux = cont;

			do{
				
				if(dados[cont].contains("/")){	//se contem "/" eh uma data
					dia = pegaDia(dados[cont]);
					mes = pegaMes(dados[cont]);
				}//fim if
				else if(dados[cont].contains(" x ")){	//se contem " x " eh placar
					placar1 = pegaPlacar1(dados[cont]);
					placar2 = pegaPlacar2(dados[cont]);
				}//fim else if
				else if(cont == aux+1){	//posicao do time1
					time1 = dados[cont];
				}//fim else if
				else if(cont == aux+3){	//posicao do time2
					time2 = dados[cont];
				}//fim else if
				else if(cont == aux+4){	//posicao do local
					local = dados[cont];
				}//fim else if
				cont++;

			}while((cont < dados.length)&&(dados[cont].contains("/")==false));
			
			ehEtapa = dados[cont-1].contains("GRUPO") || dados[cont-1].contains("FINAL") || dados[cont-1].contains("Disp.");

			if (ehEtapa){	//se a posicao anterios for uma etapa, cont voltara uma posicao.
				cont--;
			}//fim if

			partida[i] = new Partida(ano, placar1, placar2, dia, mes, etapa, time1, time2, local);
			qtdPartidas++;
		}//fim for

	}//fim criaPartidas()
	
	/*************************************************************************************************
        *Metodo: pegaPlacar1()
        *Funcao: Retornar o valor int referente ao placar1
        *************************************************************************************************/
        public static int pegaPlacar1(String s){
                String placar[] = s.split(" x ");
                return Integer.parseInt(placar[0]);
        }//fim pegaDia()

	/*************************************************************************************************
        *Metodo: pegaPlacar2()
        *Funcao: Retornar o valor int referente ao placar2
        *************************************************************************************************/
        public static int pegaPlacar2(String s){
                String placar[] = s.split(" x ");
                return Integer.parseInt(placar[1]);
        }//fim pegaDia()

	/*************************************************************************************************
	*Metodo: pegaDia()
	*Funcao: Retornar o valor int referente ao dia
	*************************************************************************************************/
	public static int pegaDia(String s){
		String data[] = s.split("/");
		return Integer.parseInt(data[0]);
	}//fim pegaDia()

	/*************************************************************************************************
	*Metodo: pegaMes()
	*Funcao: Retornar o valor int referente ao mes
	**************************************************************************************************/
	public static int pegaMes(String s){
                String data[] = s.split("/");
                return Integer.parseInt(data[1]);
	}//fim pegaMes()

	/************************************************************************************************
	*Metodo:retiraEspacos()
	*Funcao: elimina os espacos excessivos em uma string
	*************************************************************************************************/
	public static String retiraEspacos(String s){
		String semEspacos = "";
		boolean ehEspaco = false;

		for(int i = 0; i < s.length(); i++){
			if(s.charAt(i) == ' ') ehEspaco = true;
			else if(s.charAt(i) != ' ') ehEspaco = false;

			if(!ehEspaco){
				semEspacos = semEspacos + s.charAt(i);
			}//fim if
		}//fim for

		return semEspacos;
	}//fim retiraEspacos

	/************************************************************************************************
	*Metodo: retiraTags()
	*Funcao: eliminar as tags da string
	*************************************************************************************************/
	public static String retiraTags(String s){
		String semTags = "";
		boolean isTag = false;

		for(int i = 0; i < s.length(); i++){
			if(s.charAt(i) == '<' || s.charAt(i) == '&') isTag = true;

			if(!isTag){
				semTags += s.charAt(i);
			}//fim if

			if(s.charAt(i) == '>' || s.charAt(i) == ';') isTag = false;
		}//fim for

		return semTags;
	}//fim retiraTags()
}//fim classe Partida

class Lista{
	private Partida[] array;
	private int n;
	

	/****************************************************************************************************
    	* Metodos: Lista()
	* Funcao: construtores da classe
    	****************************************************************************************************/
	public Lista () {
      		this(200);
	}//fim Lista()

	public Lista (int tamanho){
		array = new Partida[tamanho];
		for(int i = 0; i < tamanho; i++){
			array[i] = new Partida();
		}//fim for
      		n = 0;
   	}//fim Lista(int)

	/***************************************************************************************************
	*Metodo: getN()
	*Funcao: retornar a quantidade de elementos da lista
	***************************************************************************************************/
	public int getN(){
		return this.n;
	}//fim getN()
 
 	/***************************************************************************************************
 	* Metodo: inserirInicio()
	* Funcao: insere um valor na primeira posicao da lista
        ****************************************************************************************************/
       	public void inserirInicio(int x, Partida[] partida) throws Exception {
 
  		if(n >= array.length){	//caso a lista esteja cheia sera gerada uma exception
			throw new Exception("Erro ao inserir!");
      		}//fim if 
 
        	//levar elementos para o fim do array
      		for(int i = n; i > 0; i--){
         		array[i] = array[i-1].retornaClone();
      		}//fim for
 
      		array[0] = partida[x].retornaClone();
      		n++;
   	}//fim inserirInicio(int)
 
   	/****************************************************************************************************
   	* Metodo: inserirFim()
	* Funcao: inserir o valor na ultima posicao vaga da lista
   	****************************************************************************************************/
	public void inserirFim(int x, Partida[] partida) throws Exception {
	
	        if(n >= array.length){	//caso a lista esteja cheia sera gerada uma exception
        		throw new Exception("Erro ao inserir!");
      		}//fim if
 
        	array[n] = partida[x].retornaClone();
        	n++;
   	}//fim inserirFim(int)
 
   	/***************************************************************************************************
    	* Metodo: inserir()
	* Funcao: Inserir um valor numa posicao passada como parametro
    	***************************************************************************************************/
   	public void inserir(int x, int pos, Partida[] partida) throws Exception {
 
        	//validar insercao
      		if(n >= array.length || pos < 0 || pos > n){	//caso a lista esteja cheia ou a posicao passada nao exista,
         		throw new Exception("Erro ao inserir!");//sera gerada uma exception
      		}//fim if
 
      		//levar elementos para o fim do array
      		for(int i = n; i > pos; i--){
         		array[i] = array[i-1].retornaClone();
      		}//fim for
 
      		array[pos] = partida[x].retornaClone();
      		n++;
   	}//fim inserir(int,int)
 
   	/**************************************************************************************************
    	* Metodo: removerInicio()
	* FUncao: remove o primeiro valor da lista
    	**************************************************************************************************/
   	public Partida removerInicio() throws Exception {
 
      		//validar remocao
      		if (n == 0) {	//caso nao haja valor a ser removido sera gerada uma exception
         		throw new Exception("Erro ao remover!");
      		}//fim if
 
      		Partida resp = new Partida();
		resp = array[0].retornaClone();
      		n--;
 
      		for(int i = 0; i < n; i++){
         		array[i] = array[i+1].retornaClone();
      		}//fim for	
		MyIO.println("(R) "+resp.getCopa()+" - "+resp.getEtapa()+" - "+resp.getTime1()+" x "+resp.getTime2());
      		return resp;
   	}//fim removerInicio()
 
   	/***************************************************************************************************
    	* Metodo: removerFim()
	* Funcao: remove o ultimo valor da Lista
    	***************************************************************************************************/
   	public Partida removerFim() throws Exception {

      		if (n == 0) {	//caso nao haja nenhum valor a ser removido sera gerada uma exception
         		throw new Exception("Erro ao remover!");
      		}//fim if
 		MyIO.println("(R) "+array[n-1].getCopa()+" - "+array[n-1].getEtapa()+" - "+array[n-1].getTime1()+" x "+array[n-1].getTime2());
      		return array[--n];
   	}//fim removerFim()
 
   	/***************************************************************************************************
    	* Metodo: remover()
	* Funcao: remove da lista o valor na posicao a ser passada por parametro
    	***************************************************************************************************/
   	public Partida remover(int pos) throws Exception {
 
      		if (n == 0 || pos < 0 || pos >= n) {     	//caso nao haja um valor a ser removido, ou a posicao passada seja invalida
         		throw new Exception("Erro ao remover!");//sera gerada uma exception
      		}//fim if
 
      		Partida resp = new Partida();
		resp = array[pos].retornaClone();
      		n--;
 
      		for(int i = pos; i < n; i++){
         		array[i] = array[i+1].retornaClone();
      		}//fim for
		MyIO.println("(R) "+resp.getCopa()+" - "+resp.getEtapa()+" - "+resp.getTime1()+" x "+resp.getTime2());
      		return resp;
   	}//fim remover()
	
	/************************************************************************
	*Metodo: mostrar()
	*Funcao: imprimir na tela os valores presentes na lista
	************************************************************************/
	public void mostrar (int i){
		array[i].imprimir();
   	}//fim mostrar()
}//fim classe Lista

class TP01P2Q02{
	/*************************************************************************************************
	*Metodo: leEntrada()
	*Entrada: Um array de Strings
	*Saida: Um inteiro representando a quantidade de copas na primeira parte da entrada
	*************************************************************************************************/
	public static int leEntrada(String[] entrada){
		int qtdCopas = 0;
		
		do{
			entrada[qtdCopas] = MyIO.readLine();
		}while(entrada[qtdCopas++].equals("0")==false);
		qtdCopas--;	//desconsidera a ultima entrada

		return qtdCopas;
	}//fim leEntrada()

	/*************************************************************************************************
	*Metodo: executor()
	*Entrada: Uma string(comando a ser executado), Uma lista de partidas
	*************************************************************************************************/
	public static void executor(String comando, Lista lista) throws Exception{
		String[] comandos = comando.split(" ");

		switch(comandos[0].charAt(0)){

			case 'I':
				Partida[] partida = new Partida[100];
				Partida.ler(comandos[1],partida);
				int pos = Integer.parseInt(comandos[2]);

				if(comandos[0].charAt(1) == 'I'){
					lista.inserirInicio(pos-1,partida);
				}//fim if
				else if(comandos[0].charAt(1) == 'F'){	
					lista.inserirFim(pos-1,partida);
				}//fim else if
				else if(comandos[0].charAt(1) == '*'){
					int pos2 = Integer.parseInt(comandos[3]);
					lista.inserir(pos-1,pos2,partida);
				}//fim else
				break;
			case 'R':
				if(comandos[0].charAt(1) == 'I'){
					lista.removerInicio();	
				}//fim if
				else if(comandos[0].charAt(1) == 'F'){
					lista.removerFim();
				}//fim else if
				else if(comandos[0].charAt(1) == '*'){
					pos = Integer.parseInt(comandos[1]);
					lista.remover(pos);
				}//fim else
				break;
		}//fim switch
	}//fim executor()

	public static void main(String[] args) throws Exception{
		String[] copas = new String[1000];
                int qtdCopas = leEntrada(copas);	//le as entradas e conta a quantidade de copas
		int qtdCom = MyIO.readInt();	//Le a quantidade de comandos
		String[] comandos = new String[qtdCom];
		Lista lista = new Lista();

		for(int i = 0; i < qtdCom; i++){        //ciclo para ler os comandos
                        comandos[i] = MyIO.readLine();
                }//fim for

		for(int i = 0; i < qtdCopas; i++){	//ciclo contrutor da lista
			Partida[] partida = new Partida[100];
                        int qtdPartida = Partida.ler(copas[i],partida);

			for(int j = 0; j < qtdPartida; j++){
				lista.inserirFim(j,partida);
			}//fim for
                }//fim for

		for(int i = 0; i < qtdCom; i++){	//ciclo para execucao dos comandos
			executor(comandos[i],lista);
		}//fim for

		for(int i = 0; i < lista.getN(); i++){
			lista.mostrar(i);
		}//fim for
	}//fim main()
}//fim TP01P2Q02
