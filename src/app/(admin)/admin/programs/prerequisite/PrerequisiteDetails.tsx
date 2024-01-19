import {
  Button,
  Group,
  Modal,
  Stack,
  TextInput,
  Skeleton,
  Box,
  BoxProps,
  Title,
  Divider,
  Paper,
} from '@mantine/core';
import { useQueryState } from 'nuqs';
import React, { useEffect, useState } from 'react';
import { Certificate } from '../../certificates/Certificate';
import { db } from '@/lib/config/firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import PrerequisiteForm from './PrerequisiteForm';
import { Prerequisite, Program } from '../modal/program';
import PrerequisiteList from './PrerequisiteList';

export default function PrerequisiteDetails(props: BoxProps) {
  const [certificateId] = useQueryState('certificate');
  const [programId] = useQueryState('id');
  const [certificate, setCertificate] = React.useState<Certificate>();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (certificateId && programId) {
      setLoading(true);
      const docRef = doc(db, 'certificates', certificateId);
      getDoc(docRef).then((doc) => {
        setCertificate({ ...doc.data(), id: doc.id } as Certificate);
        setLoading(false);
      });
    }
  }, [certificateId, programId]);

  return (
    <Box {...props}>
      {loading ? (
        <Loader />
      ) : (
        certificate && (
          <>
            <PrerequisiteForm certificate={certificate} />
            <PrerequisiteList />
          </>
        )
      )}
    </Box>
  );
}

function Loader() {
  return (
    <Stack>
      <Group justify='space-between'>
        <Skeleton w={200} h={30} />
        <Skeleton w={100} h={30} />
      </Group>
      <Stack gap={'xs'}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} w='100%' h={50} />
        ))}
      </Stack>
    </Stack>
  );
}
