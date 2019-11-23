/**********************************************************************************************
*Autor: Tulio N. Polido Lopes
*Data: 04/04/2018
*Objetivo: Refazer a questão 02 da Parte 02 do TP01 utilizando Lista com alocação flexível
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
	
	/*
	*Metodos contrutores
	*/
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

	/*
	*Retorna um string ocmo historico da partida	
	*@return String historico, a string com historico
	*/
	public String getHistorico(){
		String hist = "[COPA "+this.getCopa()+"] - "+this.getEtapa()+" - "+this.getDia()+"/"+this.getMes()+" - "+this.getTime1()+
			     " ("+this.getPlacar1()+") x ("+this.getPlacar2()+") "+this.getTime2()+"  - "+this.getLocal();
		return hist;
	}//fim getHistorico()
	
	
	/*
	*Metodos: get() e set()
	*Funcao: Pegar ou guardar valores nas variaveis privadas
	*/
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
		
	/*
	* Retorna um clone da classe Partida
	* @return Partida, retorna um clone da classe corrente
	*/
	public Partida retornaClone() throws Exception{
			return (Partida)this.clone();
	}//fim clone()
	
	/*
	* Imprime os valores da classe corrente 
	*/	
	public void imprimir(){
		MyIO.println("[COPA "+this.copa+"] - "+this.etapa+" - "+this.dia+"/"+this.mes+" - "+this.time1+
			     " ("+this.placar1+") x ("+this.placar2+") "+this.time2+"  - "+this.local);
	}//fim imprimir()

	/*
	* Le o arquivo de uma copa
	* @param String copa, a copa a ser lida
	* @param Partida[] partidas, Array de partidas a receber os valores lidos
	* @return int qtdPartidas, quantidade de partidas lidas
	*/
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
	
	/*
	* Criar as instancias de partida
	* @param String[] dados, vetor com os dados para analise
	* @param String copa, copa lida
	* @param int qtd, quantidade de partidas
	* @param Partida[] partida, array a receber os valores
	*/
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
	
	/*
        * Retornar o valor int referente ao placar1
	* @param String s, string com os placares
	* @return int, retorna o valor do placar um
        */
        public static int pegaPlacar1(String s){
                String placar[] = s.split(" x ");
                return Integer.parseInt(placar[0]);
        }//fim pegaDia()

	/*
        * Retornar o valor int referente ao placar2
	* @param String s, string com os placares
	* @return int, retorna o valor do placar dois
        */
        public static int pegaPlacar2(String s){
                String placar[] = s.split(" x ");
                return Integer.parseInt(placar[1]);
        }//fim pegaDia()

	/*
	* Retornar o valor int referente ao dia
	* @param String s, string com a data
	* @return int, retorna o dia
	*/
	public static int pegaDia(String s){
		String data[] = s.split("/");
		return Integer.parseInt(data[0]);
	}//fim pegaDia()

	/*
	* Retornar o valor int referente ao mes
	* @param String s, string com a data
	* @return int, retorna o mes
	*/
	public static int pegaMes(String s){
                String data[] = s.split("/");
                return Integer.parseInt(data[1]);
	}//fim pegaMes()

	/*
	* elimina os espacos excessivos em uma string
	* @param String s, string a ser modificada
	* @return String semEspacos, retorna a string sem espacos vazios
	*/
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

	/*
	* eliminar as tags da string
	* @param String s, string a ser modificada
	* @return String semTags, retorna a string sem as tags
	*/
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

class Celula {
    	public Partida elemento; // Elemento inserido na celula.
    	public Celula prox; // Aponta a celula prox. 
 
    	/**
    	* Construtores da classe.
	* @param Partida elemento, Partida inserida na celula
     	*/
    	public Celula() {
        	this.elemento = new Partida();
		this.prox = null;
    	}//fim Celula()
    	public Celula(Partida elemento) throws Exception {
      		this.elemento = elemento.retornaClone();
      		this.prox = null;
    	}//fim Celula()
}//fim classe celula

class Lista {
    	private Celula primeiro;
    	private Celula ultimo;
 
 
    	/**
     	* Construtor da classe que cria uma lista sem elementos (somente no cabeca).
     	*/
    	public Lista() {
        	primeiro = new Celula();
        	ultimo = primeiro;
    	}//fim Lista()
 
 
    	/**
     	* Insere um elemento na primeira posicao da lista.
    	* @param x Partida elemento a ser inserido.
     	*/
    	public void inserirInicio(Partida x) throws Exception{
        	Celula tmp = new Celula(x);
      		tmp.prox = primeiro.prox;
        	primeiro.prox = tmp;
        
		if (primeiro == ultimo) {                 
            		ultimo = tmp;
        	}//fim if
      		tmp = null;
    	}// inserirInicio()
 
 
    	/**
     	* Insere um elemento na ultima posicao da lista.
    	* @param x Partida elemento a ser inserido.
     	*/
    	public void inserirFim(Partida x) throws Exception{
        	ultimo.prox = new Celula(x);
        	ultimo = ultimo.prox;
    	}//fim inserirFim()
 
 
    	/**
     	* Remove um elemento da primeira posicao da lista.
    	* @return resp Partida elemento a ser removido.
     	* @throws Exception Se a lista nao contiver elementos.
     	*/
    	public Partida removerInicio() throws Exception {
        	if (primeiro == ultimo) {
            		throw new Exception("Erro ao remover (vazia)!");
        	}//fim if
 
      		Celula tmp = primeiro;
        	primeiro = primeiro.prox;
        	Partida resp = primeiro.elemento.retornaClone();
      		tmp.prox = null;
      		tmp = null;
        	return resp;
    	}//fim removerInicio()
 
 
    	/**
     	* Remove um elemento da ultima posicao da lista.
    	* @return resp Partida elemento a ser removido.
     	* @throws Exception Se a lista nao contiver elementos.
     	*/
    	public Partida removerFim() throws Exception {
        	if (primeiro == ultimo) {
            		throw new Exception("Erro ao remover (vazia)!");
        	}//fim if
 
        	// Caminhar ate a penultima celula:
      		Celula i;
      		for(i = primeiro; i.prox != ultimo; i = i.prox);
 
      		Partida resp = ultimo.elemento.retornaClone(); 
      		ultimo = i; 
      		i = ultimo.prox = null;
       
        	return resp;
    	}//fim removerFim()
 
 
    	/**
    	* Insere um elemento em uma posicao especifica considerando que o 
    	* primeiro elemento valido esta na posicao 0.
    	* @param x Partida elemento a ser inserido.
     	* @param pos int posicao da insercao.
     	* @throws Exception Se <code>posicao</code> invalida.
     	*/
   	public void inserir(Partida x, int pos) throws Exception {
 
      		int tamanho = tamanho();
 
      		if(pos < 0 || pos > tamanho){
            		throw new Exception("Erro ao inserir posicao (" + pos + " / tamanho = " + tamanho + ") invalida!");
      		} else if (pos == 0){
         		inserirInicio(x);
      		} else if (pos == tamanho){
         		inserirFim(x);
      		} else {
           		// Caminhar ate a posicao anterior a insercao
         		Celula i = primeiro;
         		for(int j = 0; j < pos; j++, i = i.prox);
         
         		Celula tmp = new Celula(x);
         		tmp.prox = i.prox;
         		i.prox = tmp;
         		tmp = i = null;
      		}//fim else
  	}//fim isnerir()
 
 
    	/**
    	* Remove um elemento de uma posicao especifica da lista
    	* considerando que o primeiro elemento valido esta na posicao 0.
     	* @param posicao Meio da remocao.
    	* @return resp Partida elemento a ser removido.
     	* @throws Exception Se <code>posicao</code> invalida.
     	*/
    	public Partida remover(int pos) throws Exception {
    	  	Partida resp;
      		int tamanho = tamanho();
 
        	if (primeiro == ultimo){
            		throw new Exception("Erro ao remover (vazia)!");
 
      		} else if(pos < 0 || pos >= tamanho){
            		throw new Exception("Erro ao remover (posicao " + pos + " / " + tamanho + " invalida!");
      		} else if (pos == 0){
         		resp = removerInicio();
      		} else if (pos == tamanho - 1){
         		resp = removerFim();
      		} else {
           		// Caminhar ate a posicao anterior a insercao
         		Celula i = primeiro;
         		for(int j = 0; j < pos; j++, i = i.prox);
         
         		Celula tmp = i.prox;
         		resp = tmp.elemento.retornaClone();
         		i.prox = tmp.prox;
         		tmp.prox = null;
         		i = tmp = null;
      		}//fim else
 
        	return resp;
    	}//fim remover()
 
    	/**
     	* Mostra os elementos da lista separados por espacos.
     	*/
    	public void mostrar() {
        	for (Celula i = primeiro.prox; i != null; i = i.prox) {
            		i.elemento.imprimir();
        	}//fim for
    	}//fim mostrar()
 
    	/**
     	* Procura um elemento e retorna se ele existe.
     	* @param x Elemento a pesquisar.
     	* @return <code>true</code> se o elemento existir,
     	* <code>false</code> em caso contrario.
     	*/
    	public boolean pesquisar(Partida x) {
        	boolean resp = false;
        	for (Celula i = primeiro.prox; i != null; i = i.prox) {
         		if(i.elemento.getHistorico().equals(x.getHistorico())){
            			resp = true;
            			i = ultimo;
         		}//fim for
        	}//fim for
        	return resp;
    	}//fim pesquisar()
 	
    	/**
     	* Calcula e retorna o tamanho, em numero de elementos, da lista.
     	* @return resp int tamanho
     	*/
   	public int tamanho() {
      		int tamanho = 0; 
      		for(Celula i = primeiro; i != ultimo; i = i.prox, tamanho++);
      			return tamanho;
   	}//fim tamanho()
}//fim Lista

class TP02Q01{
	/*
	* Le as entradas do usuario
	* @param String[] entrada, Um array de Strings a receber as entradas
	* @return int qtdCopas, Um inteiro representando a quantidade de copas na primeira parte da entrada
	*/
	public static int leEntrada(String[] entrada){
		int qtdCopas = 0;
		
		do{
			entrada[qtdCopas] = MyIO.readLine();
		}while(entrada[qtdCopas++].equals("0")==false);
		qtdCopas--;	//desconsidera a ultima entrada

		return qtdCopas;
	}//fim leEntrada()

	/*
	* Executa os comando do usuario
	* @param String comando Uma string(comando a ser executado)
	* @param Lista lista, Uma lista de partidas
	*/
	public static void executor(String comando, Lista lista) throws Exception{
		String[] comandos = comando.split(" ");

		switch(comandos[0].charAt(0)){

			case 'I':
				Partida[] partida = new Partida[100];
				Partida.ler(comandos[1],partida);
				int pos = Integer.parseInt(comandos[2]);

				if(comandos[0].charAt(1) == 'I'){
					lista.inserirInicio(partida[pos-1]);
				}//fim if
				else if(comandos[0].charAt(1) == 'F'){	
					lista.inserirFim(partida[pos-1]);
				}//fim else if
				else if(comandos[0].charAt(1) == '*'){
					int pos2 = Integer.parseInt(comandos[3]);
					lista.inserir(partida[pos-1],pos2);
				}//fim else
				break;
			case 'R':
				Partida r;
				if(comandos[0].charAt(1) == 'I'){
					r = lista.removerInicio();
					MyIO.println("(R) "+r.getCopa()+" - "+r.getEtapa()+" - "+r.getTime1()+" x "+r.getTime2());	
				}//fim if
				else if(comandos[0].charAt(1) == 'F'){
					r = lista.removerFim();
					MyIO.println("(R) "+r.getCopa()+" - "+r.getEtapa()+" - "+r.getTime1()+" x "+r.getTime2());
				}//fim else if
				else if(comandos[0].charAt(1) == '*'){
					pos = Integer.parseInt(comandos[1]);
					r = lista.remover(pos);
					MyIO.println("(R) "+r.getCopa()+" - "+r.getEtapa()+" - "+r.getTime1()+" x "+r.getTime2());
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
				lista.inserirFim(partida[j]);
			}//fim for
                }//fim for

		for(int i = 0; i < qtdCom; i++){	//ciclo para execucao dos comandos
			executor(comandos[i],lista);
		}//fim for

		lista.mostrar();
	}//fim main()
}//fim TP02Q01
