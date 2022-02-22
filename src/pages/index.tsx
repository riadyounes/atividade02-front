import { Box, Button, Flex, Input, SimpleGrid, Table, Tbody, Td, Th, Thead, Tr, VStack, useToast, Heading } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';

type UserProps = {
  id: number
  nome: string
  email: string
  telefone: string
}

export default function Home() {

  const [data, setData] = useState<UserProps[]>([]);
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')

  const toast = useToast()

  const handleGetUser = useCallback(async () => {
    try {
      const { data } = await api.get<UserProps[]>('users');
      setData(data);

      console.log(data);


    } catch (error) {
      toast({
        title: 'Problema ao carregar os usuarios.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [toast]);
  useEffect(() => {
    handleGetUser();
  }, [handleGetUser]);


  const handleAddUser = useCallback(async (event) => {
    try {
      const user = { nome, email, telefone }
      await api.post('users', user);


    } catch (error) {
      toast({
        title: 'Não foi possivel cadastrar usuário',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [toast, nome, email, telefone]);

  return (
    <Flex direction="column" h="100vh">
      <Flex w="100%" my="6" mx="auto" maxWidth={1480} px="6" >
        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignItems="flex-center"
          flexDir='column'
        >
          <VStack>
            <Box as='form' onSubmit={handleAddUser} mb='50px'>
              <SimpleGrid columns={[1, 1, 4]} spacing={10}>
                <Input
                  required
                  name="nome"
                  placeholder='Nome'
                  size='md'
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                />
                <Input
                  name="email"
                  placeholder='E-mail'
                  type='email'
                  size='md'
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <Input
                  name="telefone"
                  placeholder='Telefone'
                  type='tel'
                  maxLength={11}
                  size='md'
                  value={telefone}
                  onChange={(event) => setTelefone(event.target.value)}
                />
                <Button type='submit' colorScheme='pink'>Cadastrar</Button>
              </SimpleGrid>
            </Box>
            <Table variant='striped' colorScheme='whiteAlpha'>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Nome</Th>
                  <Th>E-mail</Th>
                  <Th>Telefone</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((user) => (
                  <Tr key={user.id}>
                    <Td>{user.id}</Td>
                    <Td>{user.nome}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.telefone}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </VStack>
        </SimpleGrid>
      </Flex>
    </Flex >
  );
}