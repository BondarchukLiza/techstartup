class User {
    constructor(lastName, firstName, age, education, details, requestDate) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.age = age;
        this.education = education;
        this.details = details;
        this.detailsLength = details.length;
        this.requestDate = new Date(requestDate);
    }

    getRequestMonth() {
        return this.requestDate.getMonth() + 1;
    }

    getRequestHour() {
        return this.requestDate.getHours();
    }

    getDetailsLength() {
        return this.detailsLength;
    }

    getAgeGroup() {
        if (this.age < 18) {
            return "Неповнолітній";
        } else if (this.age < 30) {
            return "Молодь";
        } else if (this.age < 60) {
            return "Дорослий";
        } else {
            return "Літня людина";
        }
    }

    getRequestSeason() {
        const month = this.getRequestMonth();

        if (month === 12 || month === 1 || month === 2) {
            return "Зима";
        } else if (month >= 3 && month <= 5) {
            return "Весна";
        } else if (month >= 6 && month <= 8) {
            return "Літо";
        } else {
            return "Осінь";
        }
    }

    getBirthYear() {
        return this.requestDate.getFullYear() - this.age;
    }
}

const users = [
    new User(
        "Шевченко", "Олена", 24, "Вища",
        "Хочу дізнатися більше про ваші проєкти.",
        "2026-01-15T10:30:00"
    ),
    new User(
        "Коваль", "Андрій", 32, "Вища",
        "Цікавить співпраця у сфері штучного інтелекту.",
        "2026-02-08T14:20:00"
    ),
    new User(
        "Бондаренко", "Марія", 19, "Середня",
        "Хочу пройти стажування у вашій компанії.",
        "2026-03-12T09:15:00"
    ),
    new User(
        "Мельник", "Іван", 45, "Вища",
        "Потрібна консультація щодо автоматизації бізнесу.",
        "2026-04-22T16:40:00"
    ),
    new User(
        "Ткаченко", "Софія", 28, "Вища",
        "Цікавить розробка вебплатформи для навчання.",
        "2026-05-05T11:10:00"
    ),
    new User(
        "Кравченко", "Дмитро", 37, "Професійна",
        "Шукаю рішення для моніторингу виробництва.",
        "2026-06-18T13:50:00"
    ),
    new User(
        "Олійник", "Анна", 22, "Вища",
        "Хочу отримати інформацію про ваші технології.",
        "2026-07-09T08:45:00"
    ),
    new User(
        "Савченко", "Олександр", 51, "Вища",
        "Плануємо впровадження системи кібербезпеки.",
        "2026-08-27T17:30:00"
    ),
    new User(
        "Романенко", "Катерина", 30, "Вища",
        "Цікавить створення мобільного застосунку.",
        "2026-09-14T12:25:00"
    ),
    new User(
        "Петренко", "Максим", 26, "Вища",
        "Хочу обговорити можливість спільного проєкту.",
        "2026-10-03T15:05:00"
    )
];

console.table(users);

function findUsersByMonthAndTime(users, month, startHour, endHour) {
    return users.filter(user =>
        user.getRequestMonth() === month &&
        user.getRequestHour() >= startHour &&
        user.getRequestHour() < endHour
    );
}

const foundUsers = findUsersByMonthAndTime(users, 1, 9, 12);

console.log("Користувачі, які звернулися в січні з 09:00 до 12:00:");
console.table(foundUsers);

const summerUsers = findUsersByMonthAndTime(users, 7, 8, 10);

console.log("Користувачі за липень з 08:00 до 10:00:");
console.table(summerUsers);

function findUserWithLongestDetails(users) {
    if (users.length === 0) {
        return null;
    }

    return users.reduce((longest, user) => {
        if (user.getDetailsLength() > longest.getDetailsLength()) {
            return user;
        }

        return longest;
    });
}

const userWithLongestDetails = findUserWithLongestDetails(users);

console.log("Користувач із найдовшим зверненням:");

if (userWithLongestDetails) {
    console.table([{
        lastName: userWithLongestDetails.lastName,
        firstName: userWithLongestDetails.firstName,
        age: userWithLongestDetails.age,
        education: userWithLongestDetails.education,
        details: userWithLongestDetails.details,
        detailsLength: userWithLongestDetails.getDetailsLength(),
        requestDate: userWithLongestDetails.requestDate.toLocaleString("uk-UA")
    }]);
}

function classifyUsers(users) {
    const groups = {
        "Бізнес-активні середнього віку": [],
        "Бізнес-пасивні похилого віку": [],
        "Інші": []
    };

    users.forEach(user => {
        const month = user.getRequestMonth();

        if (
            user.age >= 35 &&
            user.age <= 55 &&
            (month >= 9 || month <= 5)
        ) {
            groups["Бізнес-активні середнього віку"].push(user);
        } else if (
            user.age > 55 &&
            month >= 6 &&
            month <= 8
        ) {
            groups["Бізнес-пасивні похилого віку"].push(user);
        } else {
            groups["Інші"].push(user);
        }
    });

    return groups;
}

const classifiedUsers = classifyUsers(users);

console.log("Класифікація користувачів:");

for (const groupName in classifiedUsers) {
    console.log(groupName, classifiedUsers[groupName].length);
    console.table(classifiedUsers[groupName]);
}

function sortUsersAlphabetically(users) {
    return [...users].sort((a, b) => {
        const lastNameComparison = a.lastName.localeCompare(
            b.lastName,
            "uk"
        );

        if (lastNameComparison !== 0) {
            return lastNameComparison;
        }

        return a.firstName.localeCompare(b.firstName, "uk");
    });
}

const sortedUsers = sortUsersAlphabetically(users);

const usersWithBirthYear = sortedUsers.map(user => ({
    lastName: user.lastName,
    firstName: user.firstName,
    age: user.age,
    birthYear: user.getBirthYear()
}));

console.log("Користувачі за алфавітом:");
console.table(usersWithBirthYear);