import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-32 space-y-6">
      <h1 className="text-9xl font-extrabold text-primary tracking-widest">404</h1>
      <div className="bg-secondary text-white px-3 py-1 text-sm rounded rotate-12 inline-block font-semibold">
        Route Configuration Entity Absent
      </div>
      <p className="text-gray-500 max-w-sm mx-auto text-md">
        The destination interface or path query request link parameter has lost indexing. 
      </p>
      <div className="pt-4">
        <Link href="/" className="btn btn-outline btn-primary">
          Return to Core Cluster Hub
        </Link>
      </div>
    </div>
  );
}