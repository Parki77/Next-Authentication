// pages/profile/[id].tsx

// import { useRouter } from 'next/router';

interface UserProfileProps {
  params: {
    id: string;
  };
}

export default function UserProfile({ params }: UserProfileProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl"></p>
      <span className="p-2 rounded bg-orange-600">{params.id}</span>
    </div>
  );
}

// Optionally, if you're using `getServerSideProps` or `getStaticProps`
// to fetch `params` you would need to define those as well, like so:

export async function getServerSideProps(context: { params: { id: string } }) {
  const { id } = context.params;
  // You can now fetch data based on `id`
  return {
    props: {
      params: {
        id,
      },
    },
  };
}
