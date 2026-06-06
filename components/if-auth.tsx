"use server";

type IfAuthProps = {
  children: React.ReactNode;
  auth: boolean;
};

export async function IfAuth({ children, auth }: IfAuthProps) {
  if (!auth) {
    return null;
  }

  return children;
}
