const projects = [
    {
        id: 1,
        name: "Smart City",
        country: "Україна",
        continent: "Європа",
        teamId: 1,
        teamSize: 8,
        duration: 12,
        cost: 120000
    },
    {
        id: 2,
        name: "AI Assistant",
        country: "Німеччина",
        continent: "Європа",
        teamId: 2,
        teamSize: 12,
        duration: 18,
        cost: 250000
    },
    {
        id: 3,
        name: "Eco Monitoring",
        country: "Польща",
        continent: "Європа",
        teamId: 1,
        teamSize: 6,
        duration: 10,
        cost: 90000
    },
    {
        id: 4,
        name: "Cyber Shield",
        country: "США",
        continent: "Північна Америка",
        teamId: 3,
        teamSize: 15,
        duration: 24,
        cost: 350000
    },
    {
        id: 5,
        name: "Health Tech",
        country: "Канада",
        continent: "Північна Америка",
        teamId: 3,
        teamSize: 10,
        duration: 16,
        cost: 210000
    },
    {
        id: 6,
        name: "Edu Platform",
        country: "Україна",
        continent: "Європа",
        teamId: 2,
        teamSize: 7,
        duration: 9,
        cost: 85000
    },
    {
        id: 7,
        name: "Robot Vision",
        country: "Японія",
        continent: "Азія",
        teamId: 4,
        teamSize: 14,
        duration: 20,
        cost: 300000
    },
    {
        id: 8,
        name: "Green Energy",
        country: "Франція",
        continent: "Європа",
        teamId: 1,
        teamSize: 9,
        duration: 14,
        cost: 170000
    },
    {
        id: 9,
        name: "Cloud Manager",
        country: "США",
        continent: "Північна Америка",
        teamId: 4,
        teamSize: 11,
        duration: 15,
        cost: 190000
    },
    {
        id: 10,
        name: "Agro Drone",
        country: "Австралія",
        continent: "Австралія",
        teamId: 2,
        teamSize: 5,
        duration: 8,
        cost: 75000
    }
];

console.table(projects);

function sortProjectsByCountry(projects) {
    return [...projects].sort((a, b) =>
        a.country.localeCompare(b.country, 'uk')
    );
}
console.log("Проєкти, відсортовані за країною:");
console.table(sortProjectsByCountry(projects));

function calculateAverageCost(projects, teamId) {
    const teamProjects = projects.filter(project =>
        project.teamId === teamId
    );

    if (teamProjects.length === 0) {
        return 0;
    }

    const totalCost = teamProjects.reduce(
        (sum, project) => sum + Number(project.cost),
        0
    );

    return totalCost / teamProjects.length;
}

console.log(
    "Середня вартість проєктів команди 1:",
    calculateAverageCost(projects, 1)
);

function findLargestTeamProject(projects) {
    if (projects.length === 0) {
        return null;
    }

    return projects.reduce((largest, project) => {
        if (project.teamSize > largest.teamSize) {
            return project;
        }

        return largest;
    });
}

const largestTeamProject = findLargestTeamProject(projects);

console.log("Проєкт із найбільшою командою:");
console.table([largestTeamProject]);

function addProject(projects, newProject) {
    const requiredFields = [
        "id", "name", "country", "continent",
        "teamId", "teamSize", "duration", "cost"
    ];

    const hasMissingData = requiredFields.some(field =>
        newProject[field] === undefined ||
        newProject[field] === null ||
        newProject[field] === ""
    );

    if (hasMissingData) {
        projects.push(newProject);
        console.log("Неповний проєкт додано в кінець масиву.");
        return;
    }

    if (projects.some(project => project.id === newProject.id)) {
        console.log("Помилка: проєкт із таким ID вже існує.");
        return;
    }

    if (
        !Number.isFinite(newProject.cost) ||
        newProject.cost <= 0
    ) {
        console.log("Помилка: некоректна вартість проєкту.");
        return;
    }

    const insertIndex = projects.findIndex(project =>
        project.cost > newProject.cost ||
        !Number.isFinite(project.cost)
    );

    if (insertIndex === -1) {
        projects.push(newProject);
    } else {
        projects.splice(insertIndex, 0, newProject);
    }

    console.log("Проєкт додано за зростанням вартості.");
}
projects.sort((a, b) => a.cost - b.cost);

const newProject = {
    id: 11,
    name: "Digital Future",
    country: "Швеція",
    continent: "Європа",
    teamId: 5,
    teamSize: 9,
    duration: 12,
    cost: 180000
};

addProject(projects, newProject);

console.log("Масив після додавання повного проєкту:");
console.table(projects);

const incompleteProject = {
    id: 12,
    name: "Test Project",
    country: "Україна",
    continent: "Європа",
    teamId: 2,
    teamSize: 5,
    duration: 6
};

addProject(projects, incompleteProject);

console.log("Масив після додавання неповного проєкту:");
console.table(projects);

function recalculateProjectCosts(projects) {
    return projects.map(project => {
        const sameContinent = projects.some(other =>
            other.id !== project.id &&
            other.continent === project.continent &&
            other.teamSize > project.teamSize &&
            other.cost < project.cost
        );

        const differentContinentLowerCost = projects.some(other =>
            other.id !== project.id &&
            other.continent !== project.continent &&
            other.teamSize > project.teamSize &&
            other.cost < project.cost
        );

        const differentContinentHigherCost = projects.some(other =>
            other.id !== project.id &&
            other.continent !== project.continent &&
            other.teamSize > project.teamSize &&
            other.cost > project.cost
        );

        const sameCountry = projects.some(other =>
            other.id !== project.id &&
            other.country === project.country &&
            other.cost < project.cost
        );

        let newCost = project.cost;

        if (sameContinent) {
            newCost *= 1.4;
        } else if (differentContinentLowerCost) {
            newCost *= 1.6;
        } else if (differentContinentHigherCost) {
            newCost *= 2;
        } else if (sameCountry) {
            newCost *= 0.8;
        }

        return {
            name: project.name,
            oldCost: project.cost,
            newCost: Math.round(newCost * 100) / 100
        };
    });
}

const completeProjects = projects.filter(project =>
    Number.isFinite(project.cost) &&
    Number.isFinite(project.teamSize) &&
    typeof project.country === "string" &&
    typeof project.continent === "string"
);

const updatedProjects = recalculateProjectCosts(completeProjects);

console.log("Перерахована вартість проєктів:");
console.table(updatedProjects);