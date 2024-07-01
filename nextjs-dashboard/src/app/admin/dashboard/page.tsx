import Image from 'next/image';

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center mb-8">
        <Image
          src="/logo.png"
          alt="Logo"
          width={500}
          height={500}
          className="rounded-lg shadow-md"
        />
      </div>
      <h1 className="text-4xl font-bold text-center mb-6">Dashboard de Administrador</h1>
      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          Bienvenido al dashboard de administración. Aquí, el administrador tiene la capacidad de gestionar diversos aspectos del sitio web para asegurar un funcionamiento óptimo y una experiencia de usuario excelente.
        </p>
        <p>
          <strong>Gestion de Productos:</strong> El administrador puede crear, editar y eliminar productos. Esto incluye la actualización de descripciones, precios, categorías e imágenes de los productos para mantener la información actualizada y relevante.
        </p>
        <p>
          <strong>Visualizacion de Clientes:</strong> El administrador puede visualizar la informacion de todos los usuarios registrados. Esto incluye el nombre, correo electrónico y rol de cada usuario.
        </p>
      </div>
    </div>
  );
}
