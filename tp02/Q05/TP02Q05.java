/*
*Autor: Túlio N. Polido Lopes
*Data: 13/04/2018
*Objetivo: Implementar os metodos da classe Matriz e testá-los 
*/
class TP02Q05{
	public static void main(String[] args) throws Exception{
		int numCasos = MyIO.readInt();
		Matriz[] array = new Matriz[numCasos*2];

		for(int i = 0; i < numCasos*2; i++){
			array[i] = criaMatriz(array[i]);
		}//fim for
		for(int i = 0; i < numCasos*2; i+=2){
			array[i].mostrarDiagonalPrincipal();
			array[i].mostrarDiagonalSecundaria();
			Matriz soma = array[i].soma(array[i+1]);
			soma.mostrar();
			Matriz mult = array[i].multiplicacao(array[i+1]);
			mult.mostrar();
		}//fim for
	}//fim main()
	
	/*
	*Recebe uma instancia de Matriz e a inicializa
	*@param m Matriz, a matriz a ser inicializada
	*/
	public static Matriz criaMatriz(Matriz m) throws Exception{
		int l = MyIO.readInt();
		int c = MyIO.readInt();
		m = new Matriz(l,c);
		leMatriz(m);
		return m;
	}//fim criaMatriz

	/*
	*Le a matriz e atribui seus valores
	*@param m Matriz, a matriz a receber valores
	*/
	public static void leMatriz(Matriz m){
		int aux = 0;
		Celula c = m.inicio;
		while(aux < m.linha){
			int cont = 0;
			while(cont < aux){
				c = c.inf;
				cont++;
			}//fim while
			String linha = MyIO.readLine();
			String[] valores = linha.split(" ");	
			for(int i = 0; i < valores.length; i++){
				c.elemento = Integer.parseInt(valores[i]);
				c = c.dir;
			}//fim for
			aux++;
			c = m.inicio;
		}//fim while	
	}//fim leMatriz()
}//fim classe TP02Q05

class Matriz {
   	public Celula inicio;
   	public int linha, coluna;
 	
	/*
	*Construtor da Matriz
	*/
   	public Matriz () throws Exception{
      		this(3,3);
   	}//fim Matriz()
 	/*
	*Construtor da Matriz
	*@param linha int, tamanho da linha
	*@param coluna int, tamanho da coluna
	*/
   	public Matriz (int linha, int coluna) throws Exception{
      		this.linha = linha;
      		this.coluna = coluna;
		
		if(linha < 1 || coluna < 1) throw new Exception("Matriz não existe!");

		inicio = new Celula();
		Celula auxL = inicio;

		for(int i = 0; i < linha; i++){
			Celula auxC = auxL;
			for(int j = 0; j < coluna-1; j++){
				auxC.dir = new Celula();
				auxC.dir.esq = auxC;
				auxC = auxC.dir;
			}//fim for(j)
			if(i != linha-1){	//evita a criação de uma linha extra
				auxL.inf = new Celula();
				auxL.inf.sup = auxL;
				auxL = auxL.inf;
			}//fim if
			auxC = null;
		}//fim for(i)

		for(int i = 0; i < linha-1; i++){
			auxL = inicio;
			int cont = 0;
			while(cont < i){	//posiciona auxL na linha certa
				auxL = auxL.inf;
				cont++;
			}//fim while
			for(int j = 0; j < coluna-1; j++){
				auxL.dir.inf = auxL.inf.dir;
				auxL.dir.inf.sup = auxL.dir;
				auxL = auxL.dir;	
			}//fim for(j)
		}//fim for(i)
		auxL = null;
   	}//fim Matriz()

	/*
	*Pega o elemento da matriz na posicao desejada
	*@param linha int, linha onde o elemento se encontra
	*@param coluna int, coluna onde o elemento se encontra
	*@return int resp, valor do elemento na posicao
	*/
	public int getElemento(int linha, int coluna){
		Celula aux = this.inicio;
		for(int cont = 0; cont < linha; cont++){
			aux = aux.inf;
		}//fim for
		for(int cont = 0; cont < coluna; cont++){
			aux = aux.dir;
		}//fim for
		int resp = aux.elemento;
		aux = null;
		return resp;
	}//fim getElemento()

	/*
	*Seta o elemento da matriz na posicao desejada
	*@param linha int, linha onde o elemento se encontra
	*@param coluna int, coluna onde o elemento se encontra
	*@param x int, valor a ser setado na posicao
	*/
	public void setElemento(int linha, int coluna, int x){
		Celula aux = this.inicio;
		for(int cont = 0; cont < linha; cont++){
			aux = aux.inf;
		}//fim for
		for(int cont = 0; cont < coluna; cont++){
			aux = aux.dir;
		}//fim for
		aux.elemento = x;
		aux = null;
	}//fim setElemento()
 	
	/*
	*Soma todos elementos da Matriz
	*@param m Matriz, a matriz a ter elementos somados
	*@return resp Matriz, o resultado da soma
	*/
   	public Matriz soma(Matriz m) throws Exception {
      		Matriz resp = null;
 
      		if(this.linha == m.linha && this.coluna == m.coluna){
 			resp = new Matriz(this.linha,this.coluna);

			for(int i = 0; i < this.linha; i++){
				for(int j = 0; j < this.coluna; j++){
					int soma = m.getElemento(i,j) + this.getElemento(i,j);
					resp.setElemento(i,j,soma);
				}//fim for(j)
			}//fim for(i)
      		}//fim if
 
      		return resp;
   	}//fim soma()
 	
	/*
	*Multiplica os elementos da Matriz
	*@param m Matriz, a matriz a ter elementos multiplicados
	*@return resp Matriz, o resultado da multiplicacao
	*/
   	public Matriz multiplicacao (Matriz m) throws Exception {
      		Matriz resp = null;
 
      		if(m.linha == this.coluna){
			resp = new Matriz(this.linha,m.coluna);
         		for(int i = 0; i < this.linha; i++){
				for(int j = 0; j < m.coluna; j++){
					int mult = 0;
					for(int k = 0; k < linha; k++){
						mult += (this.getElemento(i,k) * m.getElemento(k,j));
					}//fim for(k)
					resp.setElemento(i,j,mult);
				}//fim for(j)
			}//fim for(i)
      		}//fim if
 
      		return resp;
   	}//fim multiplicacao()
 
	/*
	*Retorna se a Matriz é quadrada
	*/
   	public boolean isQuadrada(){
      		return (this.linha == this.coluna);
   	}//fim isQuadrada()
 
	/*
	*Mostra a diagonal principal
	*/
   	public void mostrarDiagonalPrincipal(){
      		if(isQuadrada()){
			Celula c = inicio;
			while(c.dir != null){
				MyIO.print(c.getElemento()+" ");
				c = c.dir.inf;
			}//fim while
			MyIO.print(c.getElemento());
			c = null;
			MyIO.print("\n");
      		}//fim if
   	}//fim mostrarDiagonalPrincipal()
 
	/*
	*Mostra a diagonal secundária
	*/
   	public void mostrarDiagonalSecundaria(){
      		if(isQuadrada()){
			Celula c = inicio;
			while(c.dir != null){
				c = c.dir;
			}//fim while
			while(c.esq != null){
				MyIO.print(c.getElemento()+" ");
				c = c.esq.inf;
			}//fim while
			MyIO.print(c.getElemento());
			MyIO.print("\n");
      		}//fim if
   	}//fim mostrarDiagonalSecundaria()

	/*
	*Mostra a matriz
	*/
	public void mostrar(){
		for(Celula i = inicio; i != null; i = i.inf){
			for(Celula j = i; j != null; j = j.dir){
				MyIO.print(j.elemento + " ");
			}//fim for(j)
			MyIO.print("\n");
		}//fim for(i)
	}//fim mostrar()
}//fim classe Matriz

class Celula {
   	public int elemento;
   	public Celula inf, sup, esq, dir;
 
	/*
	*Construtor da Celula
	*/
   	public Celula(){
     		this(0, null, null, null, null);
   	}//fim Celula()
 	
	/*
	*Construtor da celula
	*@param elemento int, elemento a ser alocado na celula
	*/
   	public Celula(int elemento){
      		this(elemento, null, null, null, null);
   	}//fim Celula()

	/*
	*Construtor da celula
	*@param elemento int, elemento a ser alocado na celula
	*@param inf Celula, ponteiro para a celula inferior
	*@param sup Celula, ponteiro para a celula superior
	*@param esq Celula, ponteiro para a celula da esquerda
	*@param dir Celula, ponteiro para a celula da direita
	*/
   	public Celula(int elemento, Celula inf, Celula sup, Celula esq, Celula dir){
      		this.elemento = elemento;
      		this.inf = inf;
      		this.sup = sup;
      		this.esq = esq;
      		this.dir = dir;
  	}//fim Celula()

	/*
        *Pega o valor do elemento
        *@return elemento int, o elemento da celula corrente
        */
        public int getElemento(){
                return this.elemento;
        }//fim getElemento

        /*
        *Seta o valor do elemento
        *@param x int, valor a ser assumido pelo elemento
        */
        public void setElemento(int x){
                this.elemento = x;
        }//fim setElemento()	
}//fim classe Celula
