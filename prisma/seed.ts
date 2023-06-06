import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import slug from "slug";
const prisma = new PrismaClient();

const main = async () => {
    const password = await bcrypt.hash("password", 10);
    const admin = await prisma.user.create({
        data: {
            email: "admin@test.test",
            password,
            phone: "123456785",
            name: "Admin",
            gender: "MALE",
            emailVerifiedAt: new Date().toISOString(),
        },
    });

    const adminCity = await prisma.user.create({
        data: {
            email: "admin_city@test.test",
            password,
            phone: "123456786",
            name: "Admin City",
            city: "Surabaya",
            parentId: 1,
            gender: "FEMALE",
            emailVerifiedAt: new Date().toISOString(),
        },
    });

    const user = await prisma.user.create({
        data: {
            email: "user@test.test",
            password,
            phone: "123456787",
            name: "User",
            parentId: 1,
            gender: "MALE",
            emailVerifiedAt: new Date().toISOString(),
        },
    });

    await prisma.role.createMany({
        data: [
            {
                name: "admin",
            },
            {
                name: "admin city",
            },
            {
                name: "user",
            },
        ],
    });

    const roles = await prisma.role.findMany();

    roles.forEach(async (role: any): Promise<void> => {
        await prisma.userRole
            .createMany({
                data: [
                    {
                        userId: role.id == 1 ? admin.id : (role.id == 2 ? adminCity.id : user.id),
                        roleId: role.id,
                    },
                ],
            })
            .catch((e) => {
                console.error(e);
            });
    });

    for (let i = 0; i < 10; i++) {
        await prisma.tour.create({
            data: {
                name: `Tour ${i}`,
                slug: slug(`Tour ${i}`),
                description: `Description ${i}`,
                latitude: -7.3387896,
                longitude: 112.7301445,
                province: "Jawa Timur",
                city: "Surabaya",
                district: "Sukolilo",
                subDistrict: "Sukolilo Baru",
                address:
                    "Jl. Raya Darmo Permai I No. 1, Sukolilo Baru, Kec. Sukolilo, Kota SBY, Jawa Timur 60117",
                zipCode: "60117",
                phone: `12345678${i}`,
                email: `tour${i}@test.test`,
                website: `https://tour${i}.test`,
            },
        });
    }
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
