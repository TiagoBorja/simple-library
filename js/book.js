const API_URL = "http://localhost:8080/";

async function getBooks() {
  try {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      window.location.href = '../html/error-500.html';
      return;
    }

    const response = await fetch(API_URL + 'books', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 401) {
      throw new Error('Não autorizado');
    }

    if (!response.ok) {
      const errorRow = `<tr><td colspan="6">Erro ao buscar livros</td></tr>`;
      document.querySelector("#tabela-livro tbody").innerHTML = errorRow;
      throw new Error('Erro ao buscar livros');
    }


    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro:', error.message);
    throw error;
  }
}

async function showBooks(books) {
  let table = "";

  books.forEach((book) => {
    table += `<tr>
                <td>
                  <input type="radio" class="form-check-input"
                    name="radio-stacked" data-id="${book.id}" />
                </td>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.isbn}</td>
                <td>${book.publication_year}</td>
                <td>${book.author.name}</td>
              </tr>`;
  });

  document.querySelector("#tabela-livro tbody").innerHTML = table;

  // Adicionar event listeners para os botões e radio buttons
  document.querySelectorAll('#editarLivro, #informacoesLivro, #excluirLivro').forEach(button => {
    button.addEventListener('click', function () {
      const selectedBookId = document.querySelector('input[name="radio-stacked"]:checked')?.getAttribute('data-id');
      if (selectedBookId) {
        alert(`ID do livro selecionado: ${selectedBookId}`);
      } else {
        alert('Nenhum livro selecionado.');
      }
    });
  });
}

getBooks().then(showBooks).catch(error => console.error('Erro:', error));

