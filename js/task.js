export class Task {
    constructor(title, description, dueDate) {
        this.id = Date.now().toString();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.completed = false;
    }
}
