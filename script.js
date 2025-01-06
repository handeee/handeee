document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskTitleInput = document.getElementById('task-title');
  const taskDescInput = document.getElementById('task-desc');
  const taskContainer = document.getElementById('task-container');
  const formTitle = document.getElementById('form-title');
  const submitButton = document.getElementById('submit-button');

  let tasks = []; // Görevlerin saklanacağı liste
  let editTaskId = null; // Düzenlenen görevin ID'si

  // Görev Oluşturma ve Düzenleme İşlevi
  const createOrUpdateTask = (title, desc) => {
    if (editTaskId) {
      // Düzenleme yapılıyorsa
      tasks = tasks.map((task) =>
        task.id === editTaskId ? { ...task, title, desc } : task
      );
      editTaskId = null; // Düzenlemeyi sıfırla
    } else {
      // Yeni görev ekleniyorsa
      const task = {
        id: Date.now(),
        title,
        desc,
      };
      tasks.push(task);
    }
    renderTasks();
    resetForm();
  };

  // Görev Silme İşlevi
  const deleteTask = (id) => {
    tasks = tasks.filter((task) => task.id !== id);
    renderTasks();
  };

  // Görevleri Görüntüleme İşlevi
  const renderTasks = () => {
    taskContainer.innerHTML = '';
    tasks.forEach((task) => {
      const taskElement = document.createElement('div');
      taskElement.className = 'task-item';
      taskElement.innerHTML = `
        <div class="task-content">
          <h3 class="task-title">Göreviniz</h3>
          <p>${task.title}</p>
          <h3 class="task-title">Yapılacaklar</h3>
          <p>${task.desc}</p>
        </div>
        <div class="task-actions">
          <button class=" task-edit" data-id="${task.id}">Düzenle</button>
          <button class=" task-delete" data-id="${task.id}">Sil</button>
        </div>
      `;
      taskContainer.appendChild(taskElement);
    });

    // Düzenleme ve Silme Düğmelerine Olay Ekleme
    document.querySelectorAll('.task-delete').forEach((button) => {
      button.addEventListener('click', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        deleteTask(id);
      });
    });

    document.querySelectorAll('.task-edit').forEach((button) => {
      button.addEventListener('click', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        editTask(id);
      });
    });
  };

  // Görev Düzenleme İşlevi
  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      taskTitleInput.value = taskToEdit.title;
      taskDescInput.value = taskToEdit.desc;
      formTitle.innerText = 'Görevi Düzenleyiniz';
      submitButton.innerText = 'Güncelle';
      editTaskId = id; // Düzenlenen görevin ID'sini sakla
    }
  };

  // Formu Temizleme İşlevi
  const resetForm = () => {
    taskTitleInput.value = '';
    taskDescInput.value = '';
    formTitle.innerText = 'Lütfen Görev Ekleyiniz';
    submitButton.innerText = 'Oluştur';
    editTaskId = null;
  };

  // Form Gönderildiğinde Görev Oluştur veya Düzenle
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = taskTitleInput.value;
    const desc = taskDescInput.value;
    createOrUpdateTask(title, desc);
  });

  // Başlangıçta Görevleri Render Et
  renderTasks();
});
